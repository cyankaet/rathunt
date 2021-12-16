open Tea
open Json.Decoder
include Http_utils
open Tea.Http

type msg =
  | CreateTeam
  | PostResponse of (string, string Http.error) Result.t
  | UpdateUname of string
  | UpdatePass of string
[@@bs.deriving { accessors }]

type team = { name : string; password : string }

type model = {
  txn : string transfer;
  username : string;
  password : string;
  logged_in : bool;
  team : string;
}

let make_team_req name password = [ ("team", name); ("password", password) ]

let init =
  {
    txn = Idle;
    username = "";
    password = "";
    logged_in = false;
    team = "Not logged in";
  }

let url =
  "https://thingproxy.freeboard.io/fetch/https://rathunt-backend.herokuapp.com/team/login/"

(* if username or password is empty refuse to make the team*)
let update model = function
  | CreateTeam -> (
      match model.txn with
      | Loading | Received _ ->
          print_endline "Loading";
          (model, Cmd.none)
      | Idle | Failed ->
          ( { model with txn = Loading },
            Http_utils.make_post_request url []
              (make_team_req model.username model.password)
              postResponse ) )
  | PostResponse (Error e) ->
      Js.log (Http.string_of_error e);
      ({ model with txn = Failed }, Cmd.none)
  | PostResponse (Ok response) ->
      let response_decoder = field "response" string in
      let final =
        (decodeString response_decoder) response |> Http_utils.result_to_string
      in
      ( {
          model with
          txn = Received final;
          logged_in = true;
          team = model.username;
        },
        Cmd.none )
  | UpdateUname s -> ({ model with username = s }, Cmd.none)
  | UpdatePass s -> ({ model with password = s }, Cmd.none)

let cred_view model =
  let open Html in
  div []
    [
      div []
        [
          input'
            [
              type' "text";
              value model.username;
              onInput (fun s -> UpdateUname s);
              placeholder "Username";
            ]
            [];
        ];
      div []
        [
          input'
            [
              type' "text";
              value model.password;
              onInput (fun s -> UpdatePass s);
              placeholder "Password";
            ]
            [];
        ];
      button [ onClick CreateTeam ] [ text "Make a team" ];
    ]

let view model =
  let open Html in
  div
    [ classList [ ("home-div", true) ] ]
    [
      p []
        [
          "If you haven't yet made a team, type in a new username and \
           password. If you have, login using your previously created \
           credentials." |> text;
        ];
      ( match model.txn with
      | Idle -> p [] [ cred_view model ]
      | Loading -> p [] [ text "loading..." ]
      | Received response ->
          div []
            [
              p [] [ text ("Team " ^ model.username ^ " created!") ];
              p [] [ text response ];
            ]
      | Failed ->
          p []
            [
              text "You've picked a username that's taken! Choose another.";
              cred_view model;
            ] );
    ]
