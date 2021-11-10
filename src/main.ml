open Tea
module Metapuzzle = Puzzlepage.M (Meta.M)
module Crossword = Puzzlepage.M (Crossword.M)

type model = {
  meta : Metapuzzle.model;
  crossword : Crossword.model;
  httptest : Httptest.model;
  page : string;
}
(** [model] is a type representing a model of the entire site containing
    a single [puzzle] so far *)

(** [init] is the initial state of the webpage *)
let init () _ =
  ( {
      meta = fst (Metapuzzle.init "answer");
      crossword = fst (Crossword.init "angery");
      httptest = Httptest.init;
      page = "#home";
    },
    Cmd.none )

(** [msg] is the type containing different types of event handlers *)
type msg =
  | Metapuzzlepage_msg of Metapuzzle.msg
  | Crossword_msg of Crossword.msg
  | Http_msg of Httptest.msg
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
  | Http_msg msg ->
      print_endline "3";
      if model.page = "#httptest" then
        let httptest, cmd = Httptest.update model.httptest msg in
        ({ model with httptest }, Cmd.map http_msg cmd)
      else (model, Cmd.none)
  | UrlChange loc ->
      print_endline "page changing";
      ( { model with page = loc.Web.Location.hash },
        Cmd.msg (Http_msg Httptest.Clear) )
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
      p [] [ a [ href ("#" ^ "httptest") ] [ text "httptest" ] ];
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
          | "#httptest" -> Httptest.view model.httptest |> map http_msg
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
