open Tea

module M : Puzzle.S = struct
  type t = {
    solved : int list;
    selected : int;
    answers : string list;
    box_text : string;
  }

  type model = t

  type msg = Select of int | Solve of int | UpdateText of string

  let zero_to_five = [ 0; 1; 2; 3; 4; 5 ]

  let string_clean str =
    Js.String.(toUpperCase str |> trim |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

  let answers =
    "resources/killed_answers.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  let init () =
    ({ solved = []; selected = -1; answers; box_text = "" }, Cmd.none)

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
    | _ -> (model, Cmd.none)

  let load_puzzle_content puzzle =
    let lines =
      match puzzle with
      | 2 ->
          "resources/crime_2.txt" |> Node.Fs.readFileAsUtf8Sync
          |> String.split_on_char '\n'
      | 3 ->
          "resources/crime_3.txt" |> Node.Fs.readFileAsUtf8Sync
          |> String.split_on_char '\n'
      | 4 ->
          "resources/crime_4.txt" |> Node.Fs.readFileAsUtf8Sync
          |> String.split_on_char '\n'
      | 5 ->
          "resources/crime_5.txt" |> Node.Fs.readFileAsUtf8Sync
          |> String.split_on_char '\n'
      | _ -> failwith "impossible"
    in
    let open Html in
    div []
      [
        p [] [ text (List.hd lines) ];
        ol []
          [
            (let rec make_clues = function
               | [] -> p [] []
               | clue :: rest -> div [] [ li [] [ text clue ]; make_clues rest ]
             in
             make_clues (List.tl lines));
          ];
      ]

  let autopsy_files =
    "resources/autopsy.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  let view model =
    let open Html in
    div []
      [
        i []
          [
            p []
              [
                Printf.sprintf
                  "There's ultimately nothing suspicious about a few new \
                   transfer students being murdered, right? Okay, they were a \
                   little talented."
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
                  [ onClick (Select (-1)); classList [ ("submit", true) ] ]
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
                              classList [ ("submit", true) ];
                            ]
                            [ text "Submit" ];
                        ];
                    ] );
                ( if model.selected >= 1 && model.selected <= 4 then
                  load_puzzle_content (model.selected + 1)
                else if model.selected = 0 then p [] []
                else p [] [] );
                button
                  [ onClick (Select (-1)); classList [ ("submit", true) ] ]
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
                                   classList [ ("submit", true) ];
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
                        [ onClick (Select 6); classList [ ("submit", true) ] ]
                        [ text "View autopsy files" ];
                    ]
                else p [] [] );
              ] );
      ]
end
