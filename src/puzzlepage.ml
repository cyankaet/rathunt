open Tea

module M (P : Puzzle.S) = struct
  type guess = {
    text : string;
    correct : bool;
  }

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
    Js.String.(
      toUpperCase str |> trim |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

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
        if string_clean model.box_text <> "" then
          ( {
              model with
              box_text = "";
              guesses =
                submit_guess model model.box_text :: model.guesses;
            },
            Cmd.none )
        else (model, Cmd.none)
    | UpdateText s ->
        ({ model with box_text = s; guesses = model.guesses }, Cmd.none)
    | Puzzle_msg msg ->
        let p, cmd = P.update model.puzzle msg in
        ({ model with puzzle = p }, Cmd.map puzzle_msg cmd)

  let view model =
    let open Html in
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
          [ classList [ ("submit", true); ("center-margin", true) ] ]
          [ button [ onClick Submit ] [ text "Submit Answer" ] ];
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
