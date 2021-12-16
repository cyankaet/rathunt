open Tea
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
  team_reg : Team_registration.model;
  killed_threads : KilledThreads.model;
  records : Records.model;
  page : string;
  mutable title : string;
}
(** [model] is a type representing a model of the entire site containing
    a single [puzzle] so far *)

(** [init] is the initial state of the webpage *)
let init () _ =
  ( {
      meta = fst (Metapuzzle.init "ocamltamer");
      crossword = fst (Crossword.init "autoaxle");
      killed_threads = fst (KilledThreads.init "turtle");
      treeoverflow = fst (Treeoverflow.init "bastion");
      teams = Teams.init;
      polyplay = fst (Polyplay.init "queenofhearts");
      team_reg = Team_registration.init;
      records = fst (Records.init "gem");
      page = "#home";
      title = "RatHunt";
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
  | About_msg _ -> (model, Cmd.none)
  | Faq_msg _ -> (model, Cmd.none)
  | Rules_msg _ -> (model, Cmd.none)
  | Home_msg _ -> (model, Cmd.none)
  | Story_msg _ -> (model, Cmd.none)
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
        ({ model with team_reg }, Cmd.map team_reg_msg cmd)
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
      div
        [ id "list-container"; classList [ ("center-margin", true) ] ]
        [
          p
            [ classList [ ("image-container", true) ] ]
            [
              img [ src "list_imgs/noyes.png" ] [];
              a
                [ href ("#" ^ "meta") ]
                [ text "META: Twenty Questions" ];
            ];
          p
            [ classList [ ("image-container", true) ] ]
            [
              img [ src "list_imgs/bethe.png" ] [];
              a [ href ("#" ^ "crossword") ] [ text "Grid Elements" ];
            ];
          p
            [ classList [ ("image-container", true) ] ]
            [
              img [ src "list_imgs/rose.png" ] [];
              a [ href ("#" ^ "killed") ] [ text "Killed Threads" ];
            ];
          p
            [ classList [ ("image-container", true) ] ]
            [
              img [ src "list_imgs/keeton.png" ] [];
              a [ href ("#" ^ "records") ] [ text "K. K. Records" ];
            ];
          p
            [ classList [ ("image-container", true) ] ]
            [
              img [ src "list_imgs/cook.png" ] [];
              a [ href ("#" ^ "polyplay") ] [ text "Polymorphic Play" ];
            ];
          p
            [ classList [ ("image-container", true) ] ]
            [
              img [ src "list_imgs/becker.png" ] [];
              a [ href ("#" ^ "treeoverflow") ] [ text "Tree Overflow" ];
            ];
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
        [ classList [ ("topnav", true) ] ]
        [
          a [ href ("#" ^ "home") ] [ text "Home" ];
          a [ href ("#" ^ "puzzles") ] [ text "Puzzles" ];
          a [ href ("#" ^ "story") ] [ text "Story" ];
          a [ href ("#" ^ "rules") ] [ text "Rules" ];
          a [ href ("#" ^ "faq") ] [ text "FAQ" ];
          a [ href ("#" ^ "teams") ] [ text "Teams" ];
          a [ href ("#" ^ "register") ] [ text "Login" ];
          a [ href ("#" ^ "about") ] [ text "About" ];
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
              home_view
          | "#story" ->
              model.title <- "Story";
              Story.view () |> map story_msg
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
