open Tea
open Json.Decoder
include Http_utils
open Tea.Http

type msg =
  | CreateTeam
  | PostResponse of (string, string Http.error) Result.t
[@@bs.deriving { accessors }]

type team = {
  name : string;
  solves : int;
  password : string;
}

type model = string transfer

let make_form_data name solves password =
  [
    ("team", name);
    ("solves", string_of_int solves);
    ("password", password);
  ]

let init = Idle

let default = make_form_data "Palidrome" 3 "trendy"

let url =
  "https://thingproxy.freeboard.io/fetch/https://rathunt-backend.herokuapp.com/team/new/"

let update model = function
  | CreateTeam -> (
      match model with
      | Loading
      | Received _ ->
          print_endline "Loading";
          (model, Cmd.none)
      | Idle
      | Failed ->
          print_endline "Hi";
          ( Loading,
            Http_utils.make_post_request url [] default postResponse ) )
  | PostResponse (Error e) ->
      Js.log (Http.string_of_error e);
      (Failed, Cmd.none)
  | PostResponse (Ok response) ->
      let response_decoder = field "response" string in
      let final =
        (decodeString response_decoder) response
        |> Http_utils.result_to_string
      in
      (Received final, Cmd.none)

let view model =
  let open Html in
  match model with
  | Idle ->
      p [] [ button [ onClick CreateTeam ] [ text "Make a team" ] ]
  | Loading -> p [] [ text "loading..." ]
  | Received response ->
      div [] [ p [] [ text "Team Created!" ]; p [] [ text response ] ]
  | Failed ->
      p []
        [
          text "You've picked a username that's taken! Choose another.";
          button [ onClick CreateTeam ] [ text "retry" ];
        ]
