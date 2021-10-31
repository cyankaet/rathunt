open Tea
module Metapuzzle = Puzzlepage.M (Meta.M)
module Navtest = Puzzlepage.M (Navtest.N)

type model = {
  meta : Metapuzzle.model;
  navtest : Navtest.model;
  page : string;
}
(** [model] is a type representing a model of the entire site containing
    a single [puzzle] so far *)

(** [init] is the initial state of the webpage *)
let init () url =
  ( {
      meta = fst (Metapuzzle.init "answer");
      navtest = fst (Navtest.init "answer");
      page = "#home";
    },
    Cmd.none )

(** [msg] is the type containing different types of event handlers *)
type msg =
  | Metapuzzlepage_msg of Metapuzzle.msg
  | Navtest_msg of Navtest.msg
  | UrlChange of Web.Location.location
[@@bs.deriving { accessors }]

(** [update model] is the update loop that is called whenever an event
    is happened in the model *)
let update model = function
  | Metapuzzlepage_msg msg ->
      let meta, cmd = Metapuzzle.update model.meta msg in
      ({ model with meta }, Cmd.map metapuzzlepage_msg cmd)
  | Navtest_msg msg ->
      let navtest, cmd = Navtest.update model.navtest msg in
      ({ model with navtest }, Cmd.map navtest_msg cmd)
  | UrlChange loc ->
      ({ model with page = loc.Web.Location.hash }, Cmd.none)

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
    ]

(** [view model] renders the [model] into HTML, which will become a
    website *)
let view model =
  let open Html in
  div
    [ classList [ ("center-text", true) ] ]
    [
      h1 [] [ Printf.sprintf "Rat Hunt" |> text ];
      p []
        [
          ( match model.page with
          | "#home" -> home_view
          | "#meta" ->
              Metapuzzle.view model.meta |> map metapuzzlepage_msg
          | "#navtest" -> Navtest.view model.navtest |> map navtest_msg
          | _ -> Printf.sprintf "Page Not Found" |> text );
        ];
      p [] [ a [ href ("#" ^ "meta") ] [ text "metapuzzle" ] ];
      p [] [ a [ href ("#" ^ "navtest") ] [ text "navigation test" ] ];
    ]

(** [main] starts the web app *)
let main =
  Navigation.navigationProgram urlChange
    {
      init;
      update;
      view;
      subscriptions = (fun _ -> Sub.none);
      shutdown = (fun _ -> Cmd.none);
    }
