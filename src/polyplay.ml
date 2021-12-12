open Tea

module M = struct
  (** AF: a [node] consists of its parent [prev], its [id], a string
      [value] consisting of the correct answer at that stage, a puzzle
      type, and a list of children which may be None if it is not
      generated, or Some node list if it is generated. *)

  type t = unit

  type model = t

  (** All of the possible webpage signals to handle. *)
  type msg =
    | Generate of t
    | Check of string
    | Forward of t
    | Backward
  [@@bs.deriving { accessors }]

  let init () = ((), Cmd.none)

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed *)
  let update t = function
    | Forward n -> init ()
    | Generate n -> init ()
    | Backward -> (t, Cmd.none)
    | Check s -> init ()

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)

  let view model =
    let open Html in
    div [] []
end
