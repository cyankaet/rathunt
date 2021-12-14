open Tea

module M (P : Puzzle.S) = struct
  type guess = { text : string; correct : bool }

  type t = {
    box_text : string;
    solved : bool;
    answer : string;
    guesses : guess list;
    puzzle : P.t;
  }

  type model = t

  (** [string_clean str] takes a string [str] and returned a capitalized
      string with only capitalized characters *)
  let string_clean str =
    Js.String.(toUpperCase str |> trim |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

  (** [submit_guess submission answer] takes a [submission] and compares
      it to the correct [answer] *)
  let submit_guess model submission =
    {
      text = string_clean submission;
      correct = string_clean submission = string_clean model.answer;
    }

  type msg =
    | Submit
    | UpdateText of string
    | Puzzle_msg of P.msg
    | Key_pressed of Keyboard.key_event
  [@@bs.deriving { accessors }]

  let init (ans : string) =
    ( {
        box_text = "";
        solved = false;
        answer = ans;
        guesses = [];
        puzzle = fst (P.init ());
      },
      Cmd.none )

  let update model = function
    | Submit ->
        print_endline "Submitting answer";
        if string_clean model.box_text <> "" && not model.solved then
          let guess = submit_guess model model.box_text in
          ( {
              model with
              box_text = "";
              guesses = guess :: model.guesses;
              solved = guess.correct;
            },
            Cmd.none )
        else ({ model with box_text = " " }, Cmd.none)
    | UpdateText s ->
        if model.solved then ({ model with box_text = "" }, Cmd.none)
        else ({ model with box_text = s }, Cmd.none)
    | Puzzle_msg msg ->
        let p, cmd = P.update model.puzzle msg in
        ({ model with puzzle = p }, Cmd.map puzzle_msg cmd)
    | Key_pressed _ -> (model, Cmd.none)

  let view model =
    let open Html in
    div []
      [
        ( if not model.solved then
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
              div
                [ classList [ ("center-margin", true) ] ]
                [
                  button
                    [ onClick Submit; classList [ ("submit", true) ] ]
                    [ text "Submit" ];
                ];
            ]
        else p [] [] );
        (let rec print_guesses = function
           | [] -> p [] []
           | guess :: rest ->
               p []
                 [
                   Printf.sprintf "%s: %s" guess.text
                     (if guess.correct then "correct" else "incorrect")
                   |> text;
                   print_guesses rest;
                 ]
         in
         print_guesses model.guesses);
        p [] [ P.view model.puzzle |> map puzzle_msg ];
      ]
end
