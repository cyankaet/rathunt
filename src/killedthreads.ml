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
        else ({ model with solved = cell :: model.solved }, Cmd.none)
    | Select cell -> ({ model with selected = cell; box_text = "" }, Cmd.none)
    | UpdateText str -> ({ model with box_text = str }, Cmd.none)
    | _ -> (model, Cmd.none)

  let rand_list = Rng.shuffle [ 1; 3; 5; 7; 9 ]

  let rand_string =
    List.fold_left (fun x y -> x ^ " " ^ string_of_int y) "" rand_list

  let view model =
    let open Html in
    div []
      [
        p []
          [
            Printf.sprintf
              "There's ultimately nothing suspicious about a few new transfer \
               students being murdered, right? Okay, they were a little \
               talented."
            |> text;
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
        p []
          [
            Printf.sprintf "%s"
              (List.fold_left
                 (fun x y -> x ^ " " ^ string_of_int y)
                 "" rand_list)
            |> text;
          ];
        ( match model.selected with
        | -1 ->
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
                                   onClick (Solve curr);
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
              ]
        | _ ->
            div []
              [
                p [] [ text ("Puzzle " ^ string_of_int model.selected) ];
                button
                  [ onClick (Select (-1)); classList [ ("submit", true) ] ]
                  [ text "Go back" ];
              ] );
      ]
end
