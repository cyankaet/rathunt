open Tea

type guess = {
  g_answer : string;
  correct : bool;
}
(** [guess] is a type representing guesses with a guess answer
    [g_answer] and whether the guess was [correct] or not. *)

type model = {
  temp_text : string;
  guesses : guess list;
}
(** [model] is a type representing a model of a puzzle containing
    [temp_text] in a textbox and a list of [guesses] so far *)

(** [ans] is the final answer to the puzzle *)
let ans = "answer"

let init () = ({ temp_text = ""; guesses = [] }, Cmd.none)

(** [msg] is the type containing different types of event handlers *)
type msg =
  | Move
  | Text of string
  | Update

(** [string_clean str] takes a string [str] and returned a capitalized
    string with only capitalized characters *)
let string_clean str =
  Js.String.(
    toUpperCase str |> trim |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

(** [submit_guess submission answer] takes a [submission] and compares
    it to the correct [answer] *)
let submit_guess submission answer =
  {
    g_answer = string_clean submission;
    correct = string_clean submission == string_clean answer;
  }

(** [update model] is the update loop that is called whenever an event
    is happened in the model *)
let update model = function
  | Move ->
      ( {
          temp_text = "";
          guesses = submit_guess model.temp_text ans :: model.guesses;
        },
        Cmd.none )
  | Text s -> ({ temp_text = s; guesses = model.guesses }, Cmd.none)
  | Update ->
      ( { temp_text = model.temp_text; guesses = model.guesses },
        Cmd.none )

(** [view model] renders the [model] into HTML, which will become a
    website *)
let view model =
  let open Html in
  div []
    [
      h1 [] [ Printf.sprintf "Rat Hunt" |> text ];
      p []
        [
          input'
            [
              type' "text";
              id "answer-bar";
              value model.temp_text;
              onInput (fun s -> Text s);
              placeholder "Enter Answer Here";
            ]
            [];
        ];
      p [] [ button [ onClick Move ] [ text "Submit Answer!" ] ];
      (let rec print_guesses = function
         | [] -> p [] []
         | guess :: rest ->
             p []
               [
                 Printf.sprintf "%s: %s" guess.g_answer
                   (if guess.correct then "correct" else "incorrect")
                 |> text;
                 print_guesses rest;
               ]
       in
       print_guesses model.guesses);
       table [] [
         tr [] [ 
           th [] [ text "Guess" ];
           th [] [ text "Correctness" ];
         ];
         tr [] [ 
            td [] [ button [ onClick Move ] [ text "Submit Answer!" ] ];
            td [] [ button [ onClick Move ] [ text "Submit Answer!" ] ];
          ];
          tr [] [ 
            td [] [ button [ onClick Move ] [ text "Submit Answer!" ] ];
            td [] [ button [ onClick Move ] [ text "Submit Answer!" ] ];
          ];
         ];
         a [ href ("http://localhost:5000") ] [ text "Hi" ];
       ]
    

(** [main] starts the web app *)
let main =
  App.standardProgram
    { init; update; view; subscriptions = (fun _ -> Sub.none) }