open Tea

type color =
  | Black
  | White

type model = {
  moves : int;
  turn : color;
  text : string;
}

let init () = ({ moves = 1; turn = White; text = "" }, Cmd.none)

type msg =
  | Move
  | Text of string
  | Update

let update model = function
  | Move ->
      let turn =
        match model.turn with
        | Black -> White
        | White -> Black
      in
      let moves = model.moves + 1 in
      ({ turn; moves; text = model.text }, Cmd.none)
  | Text s ->
      ({ moves = model.moves; turn = model.turn; text = s }, Cmd.none)
  | Update ->
      ( { moves = model.moves; turn = model.turn; text = model.text },
        Cmd.none )

let view model =
  let open Html in
  div []
    [
      p []
        [
          Printf.sprintf "Move %d. It is %s's move." model.moves
            ( match model.turn with
            | Black -> "Black"
            | White -> "White" )
          |> text;
        ];
      p []
        [
          input'
            [
              type' "text";
              id "answer-bar";
              value model.text;
              onInput (fun s -> Text s);
              placeholder "Enter Answer Here";
            ]
            [];
        ];
      p [] [ button [ onClick Move ] [ text "Make a move!" ] ];
      p [] [ Printf.sprintf "%s." model.text |> text ];
    ]

let main =
  App.standardProgram
    { init; update; view; subscriptions = (fun _ -> Sub.none) }
