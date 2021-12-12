open Tea

(* SPEC: The page should consist of the following two parts:

   1. A table storing 20 rows with four elements in each row. Each row
   consists of an emoji, an image, a text field that can be typed into,
   and a button that validates whether or not the string inputted into
   the text field is some pre-fixed intended string. You can find the
   list of these strings in pieces.txt in resources - the text field in
   row n is checking whether the nth string in this text file matches
   whatever is inside it, for 1 <= n <= 20. Still working on the images
   and figuring out which emojis go in which rows, but that isn't
   important until you get to [view].

   2. A nonogram grid. This is a common type of logic puzzle - look this
   up for some references. This is a 25 x 15 grid (rows x columns) with
   clues on the top and to the left that indicate the runs of filled
   squares in the solution to the nonogram. You can find the intended
   nonogram pinned in #puzzle-ideas. Each square should be a clickable
   button that can either be filled, crossed-out, or empty. This should
   be implemented so that clicking the squares cycles them between these
   three states, in that order. Don't worry about the clues yet -- the
   numbers in the clues to the left and top need to be replaced by
   emojis in a specific way - in particular, they need to be such that
   1's are replaced with game pieces whose value is 1, etc. (This
   correspondence should be hard-coded.) You can decide in
   implementation whether or not you want to do this replacement
   pseudorandomly or not, if you get there.

   All of these tasks are fairly straightforward. Studying the
   implementation of crossword will help, but ultimately a lot of this
   (read: like 80%) is still base OCaml and should quite frankly not be
   difficult. *)

module M = struct
  type square =
    | Filled
    | Crossed
    | Empty

  (* This is the rep type you're dealing with. I think this is
     sufficient. **)
  type t = {
    boxes : string array;
    grid : square array array;
  }
  (** AF: [boxes] is a [string array] that holds the strings in the
      answer checking boxes at any given point, and [grid] is a
      [square array array] that holds the state of buttons in the grid. *)

  type model = t

  (** All of the possible webpage signals to handle. I'm pretty sure
      this is everything one might want, please think and add more if
      needed when implementing update, or if you want to change the type
      of the messages. *)
  type msg =
    | Check of int * string
    | UpdateText of int * string
    | ChangeSquare of int * int
  [@@bs.deriving { accessors }]

  (**[init ()] returns the puzzle model in its initial state. *)
  let init () = ((), Cmd.none)

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed. *)
  let update t = function
    | Check (n, s) -> init ()
    | UpdateText (n, s) -> init ()
    | ChangeSquare (r, c) -> init ()

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)
  let view model =
    let open Html in
    div [] []
end
