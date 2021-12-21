open Tea
include Http_utils
module Metapuzzle = Puzzlepage.M (Meta.M)
module Crossword = Puzzlepage.M (Crossword.M)
module KilledThreads = Puzzlepage.M (Killedthreads.M)
module Records = Puzzlepage.M (Records.M)
module Polyplay = Puzzlepage.M (Polyplay.M)
module Treeoverflow = Puzzlepage.M (Treeoverflow.M)

type model = {
  meta : Metapuzzle.model;
  crossword : Crossword.model;
  polyplay : Polyplay.model;
  treeoverflow : Treeoverflow.model;
  teams : Teams.model;
  story : Story.model;
  team_reg : Team_registration.model;
  killed_threads : KilledThreads.model;
  records : Records.model;
  page : string;
  mutable title : string;
  check_puzzle : string list transfer;
}
(** [model] is a type representing a model of the entire site containing
    a single [puzzle] so far *)

let url name =
  Printf.sprintf
    "https://thingproxy.freeboard.io/fetch/https://rathunt-backend.herokuapp.com/solves/%s/"
    name

(** [init] is the initial state of the webpage *)
let init () _ =
  ( {
      treeoverflow = fst (Treeoverflow.init ());
      teams = Teams.init;
      polyplay = fst (Polyplay.init ());
      team_reg = Team_registration.init;
      meta = fst (Metapuzzle.init ());
      crossword = fst (Crossword.init ());
      killed_threads = fst (KilledThreads.init ());
      story = fst (Story.init ());
      records = fst (Records.init ());
      page = "#home";
      title = "RatHunt";
      check_puzzle = Idle;
    },
    Cmd.none )

(** [msg] is the type containing different types of event handlers *)
type msg =
  | Metapuzzlepage_msg of Metapuzzle.msg
  | Crossword_msg of Crossword.msg
  | Killedthreads_msg of KilledThreads.msg
  | About_msg of About.msg
  | Faq_msg of Faq.msg
  | Rules_msg of Rules.msg
  | Records_msg of Records.msg
  | Home_msg of Home.msg
  | Story_msg of Story.msg
  | Polyplay_msg of Polyplay.msg
  | Treeoverflow_msg of Treeoverflow.msg
  | Teams_msg of Teams.msg
  | Team_reg_msg of Team_registration.msg
  | UrlChange of Web.Location.location
  | Key_pressed of Keyboard.key_event
  | PuzzleData of (string, string Http.error) Result.t
[@@bs.deriving { accessors }]

(** [update model] is the update loop that is called whenever an event
    is happened in the model *)
let update model = function
  | PuzzleData (Ok response) -> (
      let open Json.Decoder in
      let decoder = list string in
      match decodeString decoder response with
      | Ok x ->
          print_endline "ok main.ml";
          if List.mem "bethe" x then model.crossword.solved <- true
          else ();
          if List.mem "keeton" x then model.records.solved <- true
          else ();
          if List.mem "meta" x then model.meta.solved <- true else ();
          if List.mem "rose" x then model.killed_threads.solved <- true
          else ();
          if List.mem "cook" x then model.polyplay.solved <- true
          else ();
          if List.mem "becker" x then model.treeoverflow.solved <- true
          else ();
          (model, Cmd.none)
      | Error e ->
          print_endline e;
          ({ model with check_puzzle = Failed }, Cmd.none) )
  | PuzzleData (Error e) ->
      print_endline "error sadge";
      Js.log (Http.string_of_error e);
      ({ model with check_puzzle = Failed }, Cmd.none)
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
  | About_msg _ -> (model, Cmd.none)
  | Faq_msg _ -> (model, Cmd.none)
  | Rules_msg _ -> (model, Cmd.none)
  | Home_msg _ -> (model, Cmd.none)
  | Story_msg msg ->
      print_endline "story";
      if model.page = "#story" then
        let story, cmd = Story.update model.story msg in
        ({ model with story }, Cmd.map story_msg cmd)
      else (model, Cmd.none)
  | Records_msg msg ->
      print_endline "kk slider";
      if model.page = "#records" then
        let records, cmd = Records.update model.records msg in
        ({ model with records }, Cmd.map records_msg cmd)
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
        if team_reg.logged_in then (
          model.meta.team <- team_reg.username;
          model.crossword.team <- team_reg.username;
          model.killed_threads.team <- team_reg.username;
          model.records.team <- team_reg.username;
          model.polyplay.team <- team_reg.username;
          model.treeoverflow.team <- team_reg.username;
          model.story.logged_in <- true;
          match model.check_puzzle with
          | Loading
          | Received _ ->
              print_endline "Loading";
              (model, Cmd.none)
          | Idle
          | Failed ->
              ( { model with team_reg; check_puzzle = Loading },
                Http_utils.make_get_request (url team_reg.username) []
                  puzzleData ) )
        else ({ model with team_reg }, Cmd.map team_reg_msg cmd)
      else (model, Cmd.none)
  | Polyplay_msg msg ->
      print_endline "17";
      if model.page = "#polyplay" then
        let polyplay, cmd = Polyplay.update model.polyplay msg in
        ({ model with polyplay }, Cmd.map polyplay_msg cmd)
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

let get_solves model =
  0
  + (if model.crossword.solved then 1 else 0)
  + (if model.killed_threads.solved then 1 else 0)
  + (if model.polyplay.solved then 1 else 0)
  + (if model.records.solved then 1 else 0)
  + if model.treeoverflow.solved then 1 else 0

let home_view model =
  let open Html in
  div []
    [
      h2 []
        [
          Printf.sprintf "Welcome to RatHunt! Select a puzzle." |> text;
        ];
      div
        [ classList [ ("list-bkgd", true) ] ]
        [
          div
            [
              id "list-container"; classList [ ("center-margin", true) ];
            ]
            ( [
                p
                  [ classList [ ("image-container", true) ] ]
                  [
                    img [ src "list_imgs/cook.png" ] [];
                    a
                      [ href ("#" ^ "polyplay") ]
                      [ text "Polymorphic Play" ];
                  ];
                p
                  [ classList [ ("image-container", true) ] ]
                  [
                    img [ src "list_imgs/becker.png" ] [];
                    a
                      [ href ("#" ^ "treeoverflow") ]
                      [ text "Tree Overflow" ];
                  ];
                p
                  [ classList [ ("image-container", true) ] ]
                  [
                    img [ src "list_imgs/rose.png" ] [];
                    a
                      [ href ("#" ^ "killed") ]
                      [ text "Killed Threads" ];
                  ];
                p
                  [ classList [ ("image-container", true) ] ]
                  [
                    img [ src "list_imgs/bethe.png" ] [];
                    a
                      [ href ("#" ^ "crossword") ]
                      [ text "Grid Elements" ];
                  ];
                p
                  [ classList [ ("image-container", true) ] ]
                  [
                    img [ src "list_imgs/keeton.png" ] [];
                    a
                      [ href ("#" ^ "records") ]
                      [ text "K. K. Records" ];
                  ];
              ]
            @
            if get_solves model >= 3 then
              [
                p
                  [ classList [ ("image-container", true) ] ]
                  [
                    img [ src "list_imgs/noyes.png" ] [];
                    a
                      [ href ("#" ^ "meta") ]
                      [ text "META: Twenty Questions" ];
                  ];
              ]
            else [] );
        ];
    ]

(** [view model] renders the [model] into HTML, which will become a
    website *)
let view model =
  let open Html in
  div
    [ classList [ ("center-text", true) ] ]
    [
      div
        [ classList [ ("topnav-bar", true) ] ]
        [
          a
            [ href ("#" ^ "home"); classList [ ("topnav", true) ] ]
            [ text "Home" ];
          a
            [ href ("#" ^ "puzzles"); classList [ ("topnav", true) ] ]
            [ text "Puzzles" ];
          a
            [ href ("#" ^ "story"); classList [ ("topnav", true) ] ]
            [ text "Story" ];
          a
            [ href ("#" ^ "rules"); classList [ ("topnav", true) ] ]
            [ text "Rules" ];
          a
            [ href ("#" ^ "faq"); classList [ ("topnav", true) ] ]
            [ text "FAQ" ];
          a
            [ href ("#" ^ "register"); classList [ ("topnav", true) ] ]
            [ text "Login" ];
          a
            [ href ("#" ^ "about"); classList [ ("topnav", true) ] ]
            [ text "About" ];
          a
            [ classList [ ("username", true) ] ]
            [ text model.team_reg.team ];
          (* a [ href ("#" ^ "meta") ] [ text "metapuzzle" ]; a [ href
             ("#" ^ "crossword") ] [ text "crossword" ]; *)
        ];
      h1 [] [ model.title |> text ];
      p []
        [
          ( match model.page with
          | "#home" ->
              model.title <- "RatHunt";
              Home.view () |> map home_msg
          | "#puzzles" ->
              model.title <- "Puzzles";
              home_view model
          | "#story" ->
              model.title <- "Story";
              print_endline (string_of_int (get_solves model));
              model.story.solves <- get_solves model;
              model.story.meta_solved <- model.meta.solved;
              Story.view model.story |> map story_msg
          | "#meta" ->
              model.title <- "Twenty Questions";
              Metapuzzle.view model.meta |> map metapuzzlepage_msg
          | "#crossword" ->
              model.title <- "Grid Elements";
              Crossword.view model.crossword |> map crossword_msg
          | "#killed" ->
              model.title <- "Killed Threads";
              KilledThreads.view model.killed_threads
              |> map killedthreads_msg
          | "#about" ->
              model.title <- "About";
              About.view () |> map about_msg
          | "#faq" ->
              model.title <- "FAQs";
              Faq.view () |> map faq_msg
          | "#rules" ->
              model.title <- "Rules";
              Rules.view () |> map rules_msg
          | "#records" ->
              model.title <- "K. K. Records";
              Records.view model.records |> map records_msg
          | "#teams" ->
              model.title <- "Teams";
              Teams.view model.teams |> map teams_msg
          | "#polyplay" ->
              print_endline "Going to polyplay";
              (* Metapuzzle.view model.meta |> map metapuzzlepage_msg; *)
              print_endline "";
              Polyplay.view model.polyplay |> map polyplay_msg
          | "#treeoverflow" ->
              print_endline "Going to treeoverflow";
              print_endline "";
              Treeoverflow.view model.treeoverflow
              |> map treeoverflow_msg
          | "#register" ->
              model.title <- "Login";
              Team_registration.view model.team_reg |> map team_reg_msg
          | _ -> Printf.sprintf "Page Not Found" |> text );
        ];
    ]

let subscriptions _ = [ Keyboard.downs key_pressed ] |> Sub.batch

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
