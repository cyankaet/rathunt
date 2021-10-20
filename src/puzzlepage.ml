open Tea

type guess = {
  text : string;
  correct : bool;
}

type model = {
  box_text : string;
  solved : bool;
  answer : string;
  guesses : guess list;
}

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
    correct = string_clean submission == string_clean model.answer;
  }

type msg =
  | Submit
  | UpdateText of string

let init (ans : string) =
  ( { box_text = ""; solved = false; answer = ans; guesses = [] },
    Cmd.none )

let update model = function
  | Submit ->
      ( {
          model with
          box_text = "";
          guesses = submit_guess model model.box_text :: model.guesses;
        },
        Cmd.none )
  | UpdateText s ->
      ({ model with box_text = s; guesses = model.guesses }, Cmd.none)

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
        [ classList [ ("submit", true) ] ]
        [ button [ onClick Submit ] [ text "Submit Answer!" ] ];
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
      table []
        [
          tr [] [ th [] [ text "Guess" ]; th [] [ text "Correctness" ] ];
          tr []
            [
              td
                [ classList [ ("grid", true) ] ]
                [ button [ onClick Submit ] [ text "Submit Answer!" ] ];
              td
                [ classList [ ("grid", true) ] ]
                [ button [ onClick Submit ] [ text "Submit Answer!" ] ];
            ];
          tr []
            [
              td
                [ classList [ ("grid", true) ] ]
                [ button [ onClick Submit ] [ text "Submit Answer!" ] ];
              td
                [ classList [ ("grid", true) ] ]
                [ button [ onClick Submit ] [ text "Submit Answer!" ] ];
            ];
        ];
    ]
