open Tea
open Json.Decoder
include Http_utils

type msg =
  | LoadGames
  | GamesData of (string, string Http.error) Result.t
  | Clear
[@@bs.deriving { accessors }]

type player = { name : string; rating : int; title : string option }

type game = { id : string; white : player; black : player }

type model = game list transfer

let init = Idle

let favorite_player = "alireza2003"

let player_title player =
  match player.title with
  | Some title -> Printf.sprintf "%s %s" title player.name
  | None -> player.name

let update model = function
  | LoadGames -> (
      match model with
      | Loading | Received _ ->
          print_endline "Loading";
          (model, Cmd.none)
      | Idle | Failed ->
          print_endline "Hi";
          let url =
            Printf.sprintf
              "https://lichess.org/api/games/user/%s?moves=false&max=100"
              favorite_player
          in
          ( Loading,
            Http_utils.make_get_request url
              [ Http.Header ("Accept", "application/x-ndjson") ]
              gamesData ) )
  | GamesData (Error e) ->
      Js.log (Http.string_of_error e);
      (Failed, Cmd.none)
  | GamesData (Ok response) ->
      let id_decoder = field "id" string in
      let player_decoder color =
        field "players"
          (field color
             (map3
                (fun name rating title -> { name; rating; title })
                (field "user" (field "name" string))
                (field "rating" int)
                (field "user" (field "title" string) |> maybe)))
      in
      let game_decoder =
        map3
          (fun id white black -> { id; white; black })
          id_decoder (player_decoder "white") (player_decoder "black")
      in
      let games = String.split_on_char '\n' response in
      let games_decoded =
        List.map (decodeString game_decoder) games |> Http_utils.result_to_list
      in
      (Received games_decoded, Cmd.none)
  | Clear -> (Idle, Cmd.none)

let view model =
  let open Html in
  let game_view game =
    td []
      [ a [ Printf.sprintf "#/lichess/%s" game.id |> href ] [ text game.id ] ]
    :: List.map
         (fun player -> td [] [ text player ])
         [
           player_title game.white;
           game.white.rating |> string_of_int;
           player_title game.black;
           game.black.rating |> string_of_int;
         ]
    |> tr []
  in

  match model with
  | Idle -> p [] [ button [ onClick LoadGames ] [ text "load Lichess games" ] ]
  | Loading -> p [] [ text "loading..." ]
  | Received tournament ->
      div []
        [
          p [] [ button [ onClick Clear ] [ text "Clear" ] ];
          table
            [ classList [ ("center-margin", true) ] ]
            ( tr []
                [
                  th [] [ text "Game" ];
                  th [] [ text "White" ];
                  th [] [ text "White Rating" ];
                  th [] [ text "Black" ];
                  th [] [ text "Black Rating" ];
                ]
            :: List.map game_view tournament );
        ]
  | Failed ->
      p []
        [
          text "Games could not be loaded.";
          button [ onClick LoadGames ] [ text "retry" ];
        ]
