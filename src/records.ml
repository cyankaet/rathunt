open Tea

module M = struct
  (** all possible messages to handle from the site *)
  type msg =
    | ChangeMonth of int * int
    | ChangeDate of int * int
    | Check

  type dropdown = {
    month : int;
    date : int;
    correct : bool;
  }

  type t = dropdown array
  (** internal representation of the model state, containing the state
      of each dropdown - an indicator of whether the guess is correct or
      not, and the state of the dropdowns themselves. *)

  type model = t

  (**[num_dates] is the number of songs/dates to be considered in the
     puzzle.*)
  let num_dates = 10

  (**[party_dates] are the correct dates for each dropdown, stored as
     (int, int) pairs*)
  let party_dates = ()

  (** [init] returns an initialized empty puzzle with a command to be
      executed *)
  let init () =
    ( Array.init num_dates (fun _ ->
          { month = 1; date = 1; correct = false }),
      Cmd.none )

  (** [update model msg] returns the puzzle model updated with any text
      change events, along with a command to be executed *)
  let update t = function
    | ChangeDate (p, d') ->
        let drop_p = t.(p) in
        t.(p) <- { drop_p with date = d' };
        (t, Cmd.none)
    | ChangeMonth (p, m') ->
        let drop_p = t.(p) in
        t.(p) <- { drop_p with month = m' };
        (t, Cmd.none)
    | Check -> (t, Cmd.none)

  (** [view model] returns a Vdom object that contains the HTML
      representing this crossword puzzle [model] object *)
  let view model =
    let open Html in
    div [] []
end
