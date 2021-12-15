open Tea
module CharMap = Map.Make (String)

type c_map = int CharMap.t

module M : Puzzle.S = struct
  type t = {
    solved : int list;
    selected : int;
    answers : string list;
    box_text : string;
    chars_collected : c_map;
    rolls : int;
    next_rolls : int list;
    accepted : bool;
  }

  type model = t

  type msg =
    | Select of int
    | Solve of int
    | UpdateText of string
    | Pull of int
    | Accept

  let zero_to_five = [ 0; 1; 2; 3; 4; 5 ]

  let one_to_six = [ 1; 2; 3; 4; 5; 6 ]

  let gacha_chars =
    "static/gacha_chars.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  let g_map =
    let rec gacha_map chars = function
      | [] -> []
      | num :: rest -> (num, List.hd chars) :: gacha_map (List.tl chars) rest
    in
    gacha_map gacha_chars one_to_six

  let init_rolls =
    "static/gacha.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n' |> List.map int_of_string |> Rng.shuffle

  let string_clean str =
    Js.String.(toUpperCase str |> trim |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

  let answers =
    "static/killed_answers.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  let init () =
    ( {
        solved = [];
        selected = -1;
        answers;
        box_text = "";
        chars_collected = CharMap.empty;
        rolls = 0;
        next_rolls = init_rolls;
        accepted = false;
      },
      Cmd.none )

  let update_count mapping char =
    match CharMap.find_opt char mapping with
    | None -> CharMap.add char 1 mapping
    | Some num -> CharMap.add char (num + 1) mapping

  let rec pull model pulls =
    match pulls with
    | 0 -> model
    | num ->
        let m = pull model (pulls - 1) in
        let curr_roll = List.hd m.next_rolls in
        {
          m with
          rolls = m.rolls + 1;
          next_rolls = List.tl m.next_rolls @ [ curr_roll ];
          chars_collected =
            update_count m.chars_collected
              ( match List.assoc_opt curr_roll g_map with
              | None -> failwith "Impossible"
              | Some char -> char );
        }

  let update model = function
    | Solve cell ->
        if List.mem cell model.solved then (model, Cmd.none)
        else if
          string_clean model.box_text = string_clean (List.nth answers cell)
        then
          ({ model with solved = cell :: model.solved; box_text = "" }, Cmd.none)
        else ({ model with box_text = "" }, Cmd.none)
    | Select cell -> ({ model with selected = cell; box_text = "" }, Cmd.none)
    | UpdateText str -> ({ model with box_text = str }, Cmd.none)
    | Pull num -> (pull model num, Cmd.none)
    | Accept -> ({ model with accepted = true }, Cmd.none)
    | _ -> (model, Cmd.none)

  let load_puzzle_content puzzle =
    let lines =
      match puzzle with
      | 2 ->
          "static/crime_2.txt" |> Node.Fs.readFileAsUtf8Sync
          |> String.split_on_char '\n'
      | 3 ->
          "static/crime_3.txt" |> Node.Fs.readFileAsUtf8Sync
          |> String.split_on_char '\n'
      | 4 ->
          "static/crime_4.txt" |> Node.Fs.readFileAsUtf8Sync
          |> String.split_on_char '\n'
      | 5 ->
          "static/crime_5.txt" |> Node.Fs.readFileAsUtf8Sync
          |> String.split_on_char '\n'
      | _ -> failwith "impossible"
    in
    let open Html in
    div []
      [
        i [] [ p [] [ text (List.hd lines) ] ];
        ol []
          [
            (let rec make_clues = function
               | [] -> p [] []
               | clue :: rest ->
                   div []
                     [
                       li [ classList [ ("clues", true) ] ] [ text clue ];
                       make_clues rest;
                     ]
             in
             make_clues (List.tl lines));
          ];
      ]

  let puzz_img = [ "m1.jpeg"; "m2.jpeg"; "m3.jpeg" ]

  let puzz_links =
    [
      "https://puzz.link/p?mashu/8/8/20a03900000330i0005000";
      "https://puzz.link/p?mashu/8/11/306000i200060l000300010090000i";
      "https://puzz.link/p?mashu/8/11/i090093000010i00206000i390090i";
    ]

  let autopsy_files =
    "static/autopsy.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  let view model =
    let open Html in
    div []
      [
        ( if model.selected = -1 then
          div []
            [
              i []
                [
                  p []
                    [
                      Printf.sprintf
                        "There's ultimately nothing suspicious about a few new \
                         transfer students being murdered, right? Okay, they \
                         were a little talented."
                      |> text;
                    ];
                ];
              p [] [];
              p []
                [
                  Printf.sprintf
                    {|"Oh hi there, you're in charge of investigating the crime scenes
             and identifying any information about our killer. We'll take it
             from there."|}
                  |> text;
                ];
            ]
        else div [] [] );
        ( match model.selected with
        | 6 ->
            div []
              [
                h3 [] [ text "Autopsy Files" ];
                p []
                  [
                    ol []
                      [
                        (let rec display_files = function
                           | [] -> p [] []
                           | file :: rest ->
                               div []
                                 [ li [] [ text file ]; display_files rest ]
                         in
                         display_files autopsy_files);
                      ];
                  ];
                button
                  [
                    onClick (Select (-1));
                    classList [ ("submit-subpuzzle", true) ];
                  ]
                  [ text "Go back" ];
              ]
        | 0 | 1 | 2 | 3 | 4 | 5 ->
            div []
              [
                h3 []
                  [ text ("Crime Scene " ^ string_of_int (model.selected + 1)) ];
                ( if List.mem model.selected model.solved then
                  h5 [] [ text "Solved!" ]
                else
                  div []
                    [
                      p []
                        [
                          input'
                            [
                              type' "text";
                              id "answer-bar";
                              value model.box_text;
                              onInput (fun s -> UpdateText s);
                              placeholder "Enter Answer Here";
                            ]
                            [];
                        ];
                      p []
                        [
                          button
                            [
                              onClick (Solve model.selected);
                              classList [ ("submit-subpuzzle", true) ];
                            ]
                            [ text "Submit" ];
                        ];
                    ] );
                ( if model.selected >= 1 && model.selected <= 4 then
                  load_puzzle_content (model.selected + 1)
                else if model.selected = 0 then
                  p []
                    [
                      i []
                        [
                          p []
                            [
                              text
                                "You enter and find a book on a desk about how \
                                 to interrogate people and get answers in as \
                                 few questions as possible as well as a piece \
                                 of paper with the following: (Click on the \
                                 images to get an interactive version)";
                            ];
                        ];
                      (let rec load_imgs links = function
                         | [] -> p [] []
                         | image :: rest ->
                             div []
                               [
                                 a
                                   [ href (List.hd links); target "_blank" ]
                                   [ img [ src image ] [] ];
                                 load_imgs (List.tl links) rest;
                               ]
                       in
                       load_imgs puzz_links puzz_img);
                    ]
                else
                  p []
                    [
                      i []
                        [
                          p []
                            [
                              text
                                "Are you ready to test your luck with this \
                                 gacha machine and find the common denominator \
                                 for success and riches?";
                            ];
                        ];
                      button
                        [
                          classList [ ("submit-subpuzzle", true) ];
                          onClick (Pull 1);
                        ]
                        [ text "Roll 1" ];
                      ( if model.rolls > 10 then
                        button
                          [
                            classList [ ("submit-subpuzzle", true) ];
                            onClick (Pull 10);
                          ]
                          [ text "Roll 10" ]
                      else p [] [] );
                      ( if
                        model.rolls > 100
                        && CharMap.cardinal model.chars_collected = 6
                      then
                        button
                          [
                            classList [ ("submit-subpuzzle", true) ];
                            onClick (Pull 100);
                          ]
                          [ text "Roll 100" ]
                      else p [] [] );
                      (let show_counts =
                         let bindings =
                           CharMap.bindings model.chars_collected
                         in
                         let rec display_counts = function
                           | [] -> p [] []
                           | (char, count) :: rest ->
                               div []
                                 [
                                   p []
                                     [ text (char ^ " " ^ string_of_int count) ];
                                   display_counts rest;
                                 ]
                         in
                         display_counts bindings
                       in
                       if model.rolls <> 0 then show_counts else p [] []);
                      strong []
                        [
                          p []
                            [
                              text ("Total rolls: " ^ string_of_int model.rolls);
                            ];
                        ];
                    ] );
                button
                  [
                    onClick (Select (-1));
                    classList [ ("submit-subpuzzle", true) ];
                  ]
                  [ text "Go back" ];
              ]
        | -1 | _ ->
            div []
              [
                div []
                  [
                    (let rec make_buttons = function
                       | [] -> p [] []
                       | curr :: rest ->
                           div []
                             [
                               button
                                 [
                                   onClick (Select curr);
                                   classList [ ("submit-subpuzzle", true) ];
                                 ]
                                 [
                                   text
                                     ( "Crime Scene "
                                     ^ string_of_int (curr + 1)
                                     ^ ": "
                                     ^
                                     if List.mem curr model.solved then
                                       string_clean (List.nth answers curr)
                                     else "????" );
                                 ];
                               make_buttons rest;
                             ]
                     in
                     make_buttons zero_to_five);
                  ];
                ( if List.length model.solved = 6 then
                  div []
                    [
                      p []
                        [
                          text
                            {|"Hey, that was some good work there with the crime scenes. Oh, you want the autopsy files? Here you go."|};
                        ];
                      button
                        [
                          onClick (Select 6);
                          classList [ ("submit-subpuzzle", true) ];
                        ]
                        [ text "View autopsy files" ];
                    ]
                else p [] [] );
              ] );
      ]
end
