open Tea
module Metapuzzle = Puzzlepage.M (Meta.M)
module Crossword = Puzzlepage.M (Crossword.M)
module Treeoverflow = Puzzlepage.M (Treeoverflow.M)

type model = {
  meta : Metapuzzle.model;
  crossword : Crossword.model;
  treeoverflow : Treeoverflow.model;
  teams : Teams.model;
  team_reg : Team_registration.model;
  page : string;
}
(** [model] is a type representing a model of the entire site containing
    a single [puzzle] so far *)

(** [init] is the initial state of the webpage *)
let init () _ =
  ( {
      meta = fst (Metapuzzle.init "answer");
      crossword = fst (Crossword.init "angery");
      treeoverflow = fst (Treeoverflow.init "bastion");
      teams = Teams.init;
      team_reg = Team_registration.init;
      page = "#home";
    },
    Cmd.none )

(** [msg] is the type containing different types of event handlers *)
type msg =
  | Metapuzzlepage_msg of Metapuzzle.msg
  | Crossword_msg of Crossword.msg
  | Treeoverflow_msg of Treeoverflow.msg
  | Teams_msg of Teams.msg
  | Team_reg_msg of Team_registration.msg
  | UrlChange of Web.Location.location
  | Key_pressed of Keyboard.key_event
[@@bs.deriving { accessors }]

(** [update model] is the update loop that is called whenever an event
    is happened in the model *)
let update model = function
  | Metapuzzlepage_msg msg ->
      print_endline "1";
      if model.page = "#meta" then
        let meta, cmd = Metapuzzle.update model.meta msg in
        ({ model with meta }, Cmd.map metapuzzlepage_msg cmd)
      else (model, Cmd.none)
  | Crossword_msg msg ->
      print_endline "2";
      if model.page = "#crossword" then
        let crossword, cmd = Crossword.update model.crossword msg in
        ({ model with crossword }, Cmd.map crossword_msg cmd)
      else (model, Cmd.none)
  | Treeoverflow_msg msg ->
      print_endline "3";
      if model.page = "#treeoverflow" then
        let treeoverflow, cmd =
          Treeoverflow.update model.treeoverflow msg
        in
        ({ model with treeoverflow }, Cmd.map treeoverflow_msg cmd)
      else (model, Cmd.none)
  | Teams_msg msg ->
      print_endline "4";
      if model.page = "#teams" then
        let teams, cmd = Teams.update model.teams msg in
        ({ model with teams }, Cmd.map teams_msg cmd)
      else (model, Cmd.none)
  | Team_reg_msg msg ->
      print_endline "5";
      if model.page = "#register" then
        let team_reg, cmd =
          Team_registration.update model.team_reg msg
        in
        ({ model with team_reg }, Cmd.map team_reg_msg cmd)
      else (model, Cmd.none)
  | UrlChange loc ->
      print_endline "page changing";
      ( { model with page = loc.Web.Location.hash },
        if loc.Web.Location.hash <> "#teams" then
          Cmd.msg (Teams_msg Teams.Clear)
        else Cmd.msg (Teams_msg Teams.LoadGames) )
  | Key_pressed e -> (
      ( model,
        match (e.ctrl, e.key_code) with
        | _, 13 ->
            if model.page = "#meta" then
              Cmd.msg (Metapuzzlepage_msg Metapuzzle.Submit)
            else if model.page = "#crossword" then
              Cmd.msg (Crossword_msg Crossword.Submit)
            else Cmd.none
        | _ -> Cmd.none ) )

let home_view =
  let open Html in
  div []
    [
      h2 []
        [
          Printf.sprintf
            "Welcome to RatHunt. Select a puzzle to start with (hint: \
             not the meta)."
          |> text;
        ];
      p [] [ a [ href ("#" ^ "meta") ] [ text "metapuzzle" ] ];
      p [] [ a [ href ("#" ^ "crossword") ] [ text "crossword" ] ];
      p [] [ a [ href ("#" ^ "treeoverflow") ] [ text "treeoverflow" ] ];
    ]

(** [view model] renders the [model] into HTML, which will become a
    website *)
let view model =
  let open Html in
  div
    [ classList [ ("center-text", true) ] ]
    [
      div
        [ classList [ ("topnav", true) ] ]
        [
          a [ href ("#" ^ "home") ] [ text "Home" ];
          a [ href ("#" ^ "teams") ] [ text "Teams" ];
          a [ href ("#" ^ "register") ] [ text "Register" ];
          (* a [ href ("#" ^ "meta") ] [ text "metapuzzle" ]; a [ href
             ("#" ^ "crossword") ] [ text "crossword" ]; *)
        ];
      h1 [] [ Printf.sprintf "Rat Hunt" |> text ];
      p []
        [
          ( match model.page with
          | "#home" -> home_view
          | "#meta" ->
              print_endline "Going to meta";
              (* Metapuzzle.view model.meta |> map metapuzzlepage_msg; *)
              print_endline "";
              Metapuzzle.view model.meta |> map metapuzzlepage_msg
          | "#crossword" ->
              print_endline "Going to crossword";
              (* Metapuzzle.view model.meta |> map metapuzzlepage_msg; *)
              print_endline "";
              Crossword.view model.crossword |> map crossword_msg
          | "#treeoverflow" ->
              print_endline "Going to treeoverflow";
              print_endline "";
              Treeoverflow.view model.treeoverflow
              |> map treeoverflow_msg
          | "#teams" -> Teams.view model.teams |> map teams_msg
          | "#register" ->
              Team_registration.view model.team_reg |> map team_reg_msg
          | _ -> Printf.sprintf "Page Not Found" |> text );
        ];
    ]

let subscriptions model = [ Keyboard.downs key_pressed ] |> Sub.batch

(** [main] starts the web app *)
let main =
  Navigation.navigationProgram urlChange
    {
      init;
      update;
      view;
      subscriptions;
      shutdown = (fun _ -> Cmd.none);
    }
