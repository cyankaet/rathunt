open Tea
module Metapuzzle = Puzzlepage.M (Meta.M)
module Crossword = Puzzlepage.M (Crossword.M)
module KilledThreads = Puzzlepage.M (Killedthreads.M)
module Records = Puzzlepage.M (Records.M)

type model = {
  meta : Metapuzzle.model;
  crossword : Crossword.model;
  teams : Teams.model;
  team_reg : Team_registration.model;
  killed_threads : KilledThreads.model;
  records : Records.model;
  page : string;
}
(** [model] is a type representing a model of the entire site containing
    a single [puzzle] so far *)

(** [init] is the initial state of the webpage *)
let init () _ =
  ( {
      meta = fst (Metapuzzle.init "answer");
      crossword = fst (Crossword.init "angery");
      killed_threads = fst (KilledThreads.init "turtle");
      teams = Teams.init;
      team_reg = Team_registration.init;
      records = fst (Records.init "gem");
      page = "#home";
    },
    Cmd.none )

(** [msg] is the type containing different types of event handlers *)
type msg =
  | Metapuzzlepage_msg of Metapuzzle.msg
  | Crossword_msg of Crossword.msg
  | Killedthreads_msg of KilledThreads.msg
  | Records_msg of Records.msg
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
  | Killedthreads_msg msg ->
      print_endline "5";
      if model.page = "#killed" then
        let killed_threads, cmd =
          KilledThreads.update model.killed_threads msg
        in
        ({ model with killed_threads }, Cmd.map killedthreads_msg cmd)
      else (model, Cmd.none)
  | Records_msg msg ->
      print_endline "kk slider";
      if model.page = "#records" then
        let records, cmd = Records.update model.records msg in
        ({ model with records }, Cmd.map records_msg cmd)
      else (model, Cmd.none)
  | Teams_msg msg ->
      print_endline "3";
      if model.page = "#teams" then
        let teams, cmd = Teams.update model.teams msg in
        ({ model with teams }, Cmd.map teams_msg cmd)
      else (model, Cmd.none)
  | Team_reg_msg msg ->
      print_endline "4";
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
            else if model.page = "#killed" then
              Cmd.msg (Killedthreads_msg KilledThreads.Submit)
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
      p [] [ a [ href ("#" ^ "killed") ] [ text "Killed Threads" ] ];
      p [] [ a [ href ("#" ^ "records") ] [ text "K. K. Records" ] ];
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
          | "#killed" ->
              print_endline "Going to killed";
              KilledThreads.view model.killed_threads
              |> map killedthreads_msg
          | "#records" ->
              print_endline "Going to records";
              Records.view model.records |> map records_msg
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
