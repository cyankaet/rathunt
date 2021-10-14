open Tea

type color =
  | Black
  | White

type model = {
  moves : int;
  turn : color;
}

let init () = ({ moves = 1; turn = White }, Cmd.none)

type msg = Move

let update model = function
  | Move ->
      let turn =
        match model.turn with
        | Black -> White
        | White -> Black
      in
      let moves = model.moves + 1 in
      ({ turn; moves }, Cmd.none)

let view model =
  let open Html in
  div []
    [
      p []
        [
          Printf.sprintf "Move %d.  It is %s's move." model.moves
            ( match model.turn with
            | Black -> "Black"
            | White -> "White" )
          |> text;
        ];
      p [] [ button [ onClick Move ] [ text "Make a move!" ] ];
    ]

let main =
  App.standardProgram
    { init; update; view; subscriptions = (fun _ -> Sub.none) }
