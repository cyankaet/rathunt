open Tea

module M = struct
  type msg = ChangeSquare of string

  type t =
    | ()
        (** internal representation of the model state, containing a
            grid of crossword squares and a saved list of all chemical
            element abbreviations *)

  type model = t

  (** [init] returns an initialized empty puzzle with a command to be
      executed *)
  let init () = ((), Cmd.none)

  (** [update model msg] returns the puzzle model updated with any text
      change events, along with a command to be executed *)
  let update t = function
    | ChangeSquare r -> (t, Cmd.none)

  (** [view model] returns a Vdom object that contains the HTML
      representing this crossword puzzle [model] object *)
  let view model =
    let open Html in
    div [] []
end
