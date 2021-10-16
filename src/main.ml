open Tea


type guess = {
  g_answer : string;
  correct : bool;
}

type model = {
  text : string;
  temp_text: string;
  guesses: guess list;
}

let ans = "answer"
let init () = ({ text = ""; temp_text = ""; guesses = [];}, Cmd.none)

type msg =
  | Move
  | Text of string
  | Update

let string_clean str = Js.String.(toUpperCase str |> trim 
  |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

let submit_guess submission answer = {
  g_answer = string_clean submission;
  correct = string_clean submission == string_clean answer;
}


let update model = function
  | Move ->
      ({text = string_clean model.temp_text; temp_text = ""; guesses = (submit_guess model.temp_text ans) :: model.guesses }, Cmd.none)
  | Text s ->
      ({text = model.text; temp_text = s; guesses = model.guesses }, Cmd.none)
  | Update ->
      ( {text = model.text; temp_text = model.temp_text; guesses = model.guesses }, Cmd.none)
      
  
let view model =
  let open Html in
  div []
    [
      h1 [] [Printf.sprintf "Rat Hunt" |> text ];
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
      p [] [ Printf.sprintf "%s." model.text |> text ];
      let rec print_guesses = function
      | [] -> p [] []
      | guess :: rest ->
          p []
            [ Printf.sprintf "%s: %s" guess.g_answer (if guess.correct then "correct" else "incorrect") |> text; print_guesses rest ]
      in print_guesses model.guesses;
    ]

let main =
  App.standardProgram
    { init; update; view; subscriptions = (fun _ -> Sub.none) }
