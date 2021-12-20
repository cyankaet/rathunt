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

  let name = "rose"
  let solution = "TURTLE"
  let zero_to_five = [ 0; 1; 2; 3; 4; 5 ]
  let one_to_six = [ 1; 2; 3; 4; 5; 6 ]

  (** Load the chars used in the gacha game *)
  let gacha_chars =
    "static/gacha_chars.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** Maps the Gacha characters with a number *)
  let g_map =
    let rec gacha_map chars = function
      | [] -> []
      | num :: rest ->
          (num, List.hd chars) :: gacha_map (List.tl chars) rest
    in
    gacha_map gacha_chars one_to_six

  (** The initial order of rolls in the puzzle *)
  let init_rolls =
    "static/gacha.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map int_of_string |> Rng.shuffle

  let string_clean str =
    Js.String.(
      toUpperCase str |> trim |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

  (** Reading the subpuzzle answers into a list *)
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

  (** Updates the count in the map for the Gacha game *)
  let update_count mapping char =
    match CharMap.find_opt char mapping with
    | None -> CharMap.add char 1 mapping
    | Some num -> CharMap.add char (num + 1) mapping

  (** Does a certain number of pulls from the Gacha game *)
  let rec pull model pulls =
    if pulls = 0 then model
    else
      let m = pull model (pulls - 1) in
      let curr_roll = List.hd m.next_rolls in
      {
        m with
        rolls = m.rolls + 1;
        next_rolls = List.tl m.next_rolls @ [ curr_roll ];
        chars_collected =
          update_count m.chars_collected
            (match List.assoc_opt curr_roll g_map with
            | None -> failwith "Impossible"
            | Some char -> char);
      }

  let update model = function
    | Solve cell ->
        if List.mem cell model.solved then (model, Cmd.none)
        else if
          string_clean model.box_text
          = string_clean (List.nth answers cell)
        then
          ( { model with solved = cell :: model.solved; box_text = "" },
            Cmd.none )
        else ({ model with box_text = "" }, Cmd.none)
    | Select cell ->
        ({ model with selected = cell; box_text = "" }, Cmd.none)
    | UpdateText str -> ({ model with box_text = str }, Cmd.none)
    | Pull num -> (pull model num, Cmd.none)
    | Accept -> ({ model with accepted = true }, Cmd.none)

  (** Makes the puzzle content for purely textual clue-based puzzles *)
  let load_text_puzzle_content puzzle =
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
    div
      [ classList [ ("home-div", true) ] ]
      [
        i [] [ p [] [ text (List.hd lines) ] ];
        div
          [ classList [ ("clues", true) ] ]
          [
            ol []
              (List.map
                 (fun clue -> li [] [ text clue ])
                 (List.tl lines));
          ];
      ]

  let puzz_img = [ "m1.jpeg"; "m2.jpeg"; "m3.jpeg" ]

  let puzz_links =
    [
      "https://puzz.link/p?mashu/8/8/20a03900000330i0005000";
      "https://puzz.link/p?mashu/8/11/306000i200060l000300010090000i";
      "https://puzz.link/p?mashu/8/11/i090093000010i00206000i390090i";
    ]

  (** Loads the autopsy files for the final part of the puzzle*)
  let autopsy_files =
    "static/autopsy.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** Makes the flavortext on the initial page of the puzzle *)
  let flavor =
    let open Html in
    div
      [ classList [ ("home-div", true) ] ]
      [
        i []
          [
            p []
              [
                Printf.sprintf
                  "There's ultimately nothing suspicious about a few \
                   new transfer students being murdered, right? Okay, \
                   they were a little talented."
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

  (** Makes the autopsy page of the puzzle *)
  let make_autopsy_page =
    let open Html in
    div []
      [
        h3 [] [ text "Autopsy Files" ];
        p []
          [
            ol []
              [
                div
                  [ classList [ ("center-text", true) ] ]
                  (let rec display_files = function
                     | [] -> []
                     | file :: rest ->
                         li [] [ text file ] :: display_files rest
                   in
                   display_files autopsy_files);
              ];
          ];
        button
          [
            onClick (Select (-1));
            classList [ ("submit-subpuzzle", true) ];
          ]
          [ text "Back" ];
      ]

  (** Makes the "home/landing page" for the puzzle *)
  let puzzle_home model =
    let open Html in
    div []
      [
        div []
          (let rec make_buttons = function
             | [] -> []
             | curr :: rest ->
                 div
                   [ classList [ ("nav-padding", true) ] ]
                   [
                     button
                       [
                         onClick (Select curr);
                         classList [ ("nav-subpuzzle", true) ];
                       ]
                       [
                         text
                           ("Crime Scene "
                           ^ string_of_int (curr + 1)
                           ^ ": "
                           ^
                           if List.mem curr model.solved then
                             string_clean (List.nth answers curr)
                           else "????");
                       ];
                   ]
                 :: make_buttons rest
           in
           make_buttons zero_to_five);
        (if List.length model.solved >= 5 then
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
                 classList [ ("nav-subpuzzle", true) ];
               ]
               [ text "View autopsy files" ];
           ]
        else p [] []);
      ]

  (** Makes the view for the Masyu (room 1) subpuzzle *)
  let masyu =
    let open Html in
    div
      [ classList [ ("home-div", true) ] ]
      [
        p []
          [
            i []
              [
                p []
                  [
                    text
                      "You enter and find a book on a desk about how \
                       to interrogate people and get answers in as few \
                       questions as possible as well as a piece of \
                       paper with the following: (Click on the images \
                       to get an interactive version)";
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
          ];
      ]

  (** Makes the Gacha subpuzzle (Room 6) *)
  let gacha model =
    let open Html in
    p []
      [
        i []
          [
            p []
              [
                text
                  "Are you ready to test your luck with this gacha \
                   machine and find the common denominator for success \
                   and riches?";
              ];
          ];
        button
          [ classList [ ("submit-subpuzzle", true) ]; onClick (Pull 1) ]
          [ text "Roll 1" ];
        (if model.rolls > 10 then
         button
           [
             classList [ ("submit-subpuzzle", true) ]; onClick (Pull 10);
           ]
           [ text "Roll 10" ]
        else p [] []);
        (if
         model.rolls > 100 && CharMap.cardinal model.chars_collected = 6
        then
         button
           [
             classList [ ("submit-subpuzzle", true) ];
             onClick (Pull 100);
           ]
           [ text "Roll 100" ]
        else p [] []);
        (let show_counts =
           let bindings = CharMap.bindings model.chars_collected in
           let rec display_counts = function
             | [] -> p [] []
             | (char, count) :: rest ->
                 div []
                   [
                     p [] [ text (char ^ " " ^ string_of_int count) ];
                     display_counts rest;
                   ]
           in
           display_counts bindings
         in
         if model.rolls <> 0 then show_counts else p [] []);
        strong []
          [
            p [] [ text ("Total rolls: " ^ string_of_int model.rolls) ];
          ];
      ]

  let puzzle_content model =
    let open Html in
    div []
      [
        (if model.selected = -1 then flavor else div [] []);
        (match model.selected with
        | 6 -> make_autopsy_page
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5 ->
            div []
              [
                h3 []
                  [
                    text
                      ("Crime Scene "
                      ^ string_of_int (model.selected + 1));
                  ];
                (if List.mem model.selected model.solved then
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
                    ]);
                (if model.selected >= 1 && model.selected <= 4 then
                 load_text_puzzle_content (model.selected + 1)
                else if model.selected = 0 then masyu
                else gacha model);
                button
                  [
                    onClick (Select (-1));
                    classList [ ("submit-subpuzzle", true) ];
                  ]
                  [ text "Back" ];
              ]
        | -1
        | _ ->
            puzzle_home model);
      ]

  let trigger_warning =
    let open Html in
    div []
      [
        h3 [] [ text "Trigger Warning" ];
        div
          [ classList [ ("home-div", true) ] ]
          [
            p []
              [
                text
                  "This puzzle contains many mentions of death! We \
                   created this puzzle when the situation at Cornell \
                   was not as bad as it is now. Please work on this \
                   puzzle at your own discretion.";
              ];
          ];
        div
          [ classList [ ("trigger-padding", true) ] ]
          [
            a
              [
                href ("#" ^ "puzzles");
                classList [ ("submit-subpuzzle", true) ];
              ]
              [ text "Back" ];
          ];
        div
          [ classList [ ("trigger-padding", true) ] ]
          [
            button
              [ classList [ ("nav-subpuzzle", true) ]; onClick Accept ]
              [ text "I understand. Show the puzzle!" ];
          ];
      ]

  let view model =
    if model.accepted then puzzle_content model else trigger_warning
end
