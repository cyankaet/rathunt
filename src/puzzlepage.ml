open Tea
include Http_utils

module M (P : Puzzle.S) = struct
  type guess = {
    text : string;
    correct : bool;
  }

  type t = {
    box_text : string;
    mutable solved : bool;
    guesses : guess list;
    puzzle : P.t;
    mutable team : string;
    txn : string transfer;
    answer : string;
  }

  type model = t

  let url =
    "https://thingproxy.freeboard.io/fetch/https://rathunt-backend.herokuapp.com/check/"

  let make_guess_req team puzzle guess =
    [ ("team", team); ("puzzle", puzzle); ("guess", guess) ]

  (** [string_clean str] takes a string [str] and returned a capitalized
      string with only capitalized characters *)
  let string_clean str =
    Js.String.(
      toUpperCase str |> trim |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

  type msg =
    | Submit
    | UpdateText of string
    | Puzzle_msg of P.msg
    | Key_pressed of Keyboard.key_event
    | PostResponse of (string, string Http.error) Result.t
  [@@bs.deriving { accessors }]

  let init () =
    ( {
        box_text = "";
        solved = false;
        guesses = [];
        puzzle = fst (P.init ());
        team = "";
        txn = Idle;
        answer = "";
      },
      Cmd.none )

  let update model = function
    | PostResponse (Ok response) ->
        print_endline "ok response";
        if response = "\"correct\"" then
          ( {
              model with
              txn = Received response;
              answer = string_clean model.box_text;
              solved = true;
            },
            Cmd.none )
        else ({ model with txn = Idle; solved = false }, Cmd.none)
    | PostResponse (Error e) ->
        print_endline "error sadge";
        Js.log (Http.string_of_error e);
        ({ model with txn = Failed }, Cmd.none)
    | Submit ->
        print_endline "Submitting answer";
        let clean_submit = string_clean model.box_text in
        if clean_submit <> "" && not model.solved then
          match model.txn with
          | Loading
          | Received _ ->
              print_endline "Loading";
              (model, Cmd.none)
          | Idle
          | Failed ->
              ( { model with txn = Loading },
                Http_utils.make_post_request url []
                  (make_guess_req model.team P.name clean_submit)
                  postResponse )
        else (model, Cmd.none)
        (* let guess = submit_guess model model.box_text in ( { model
           with box_text = ""; guesses = guess :: model.guesses; solved
           = guess.correct; }, Cmd.none ) else ({ model with box_text =
           " " }, Cmd.none) *)
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
        (if not model.solved then
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
        else p [] [ P.solution |> text ]);
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
