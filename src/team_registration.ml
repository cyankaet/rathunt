open Tea
open Json.Decoder
include Http_utils

type msg = CreateTeam | PostResponse of (string, string Http.error) Result.t
[@@bs.deriving { accessors }]

type team = { name : string; solves : int; guesses : int; hints : int }

type model = string transfer

let make_form_data name solves guesses hints =
  [
    ("name", name);
    ("solves", string_of_int solves);
    ("guesses", string_of_int guesses);
    ("hints", string_of_int hints);
  ]

let init = Idle

let default = make_form_data "Galactic Trendsetters" 10 2 11

let url = "http://ptsv2.com/t/bar/post"

let update model = function
  | CreateTeam -> (
      match model with
      | Loading | Received _ ->
          print_endline "Loading";
          (model, Cmd.none)
      | Idle | Failed ->
          print_endline "Hi";
          (Loading, Http_utils.make_post_request url [] default postResponse) )
  | PostResponse (Error e) ->
      Js.log (Http.string_of_error e);
      (Failed, Cmd.none)
  | PostResponse (Ok response) ->
      let response_decoder = field "response" string in
      let r_decoder = map (fun resp -> resp) response_decoder in
      let final =
        (decodeString r_decoder) response |> Http_utils.result_to_string
      in
      (Received final, Cmd.none)

let view model =
  let open Html in
  match model with
  | Idle -> p [] [ button [ onClick CreateTeam ] [ text "Make a team" ] ]
  | Loading -> p [] [ text "loading..." ]
  | Received response ->
      div [] [ p [] [ text "Team Created!" ]; p [] [ text response ] ]
  | Failed ->
      p []
        [
          text "Could not create team";
          button [ onClick CreateTeam ] [ text "retry" ];
        ]
