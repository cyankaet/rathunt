open Tea
module Metapuzzle = Puzzlepage.Puzzlepage (Puzzlepage.Meta)

type model = { meta : Metapuzzle.model }
(** [model] is a type representing a model of the entire site containing
    a single [puzzle] so far *)

(** [init] is the initial state of the webpage *)
let init () = ({ meta = fst (Metapuzzle.init "answer") }, Cmd.none)

(** [msg] is the type containing different types of event handlers *)
type msg = Puzzlepage_msg of Metapuzzle.msg
[@@bs.deriving { accessors }]

(** [update model] is the update loop that is called whenever an event
    is happened in the model *)
let update model = function
  | Puzzlepage_msg msg ->
      let meta, cmd = Metapuzzle.update model.meta msg in
      ({ meta }, Cmd.map puzzlepage_msg cmd)

(** [view model] renders the [model] into HTML, which will become a
    website *)
let view model =
  let open Html in
  div
    [ classList [ ("center-text", true) ] ]
    [
      h1 [] [ Printf.sprintf "Rat Hunt" |> text ];
      p [] [ Metapuzzle.view model.meta |> map puzzlepage_msg ];
      a [ href "http://localhost:5000" ] [ text "Hi" ];
    ]

(** [main] starts the web app *)
let main =
  App.standardProgram
    { init; update; view; subscriptions = (fun _ -> Sub.none) }
