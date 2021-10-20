open Tea

type guess
(** The abstract type of values representing guesses made on the puzzle*)

type model
(** The abstract type of values representing a puzzle to be solved*)

type msg
(** All of the possile webpage signals to handle**)

val init : string -> model * 'a Tea.Cmd.t
(** [init s] returns an initial puzzle value with correct answer [s],
    along with a command to be executed on init*)

val update : model -> msg -> model * 'a Tea.Cmd.t
(** [update model msg] returns the puzzle model updated according to the
    accompanying message, along with a command to be executed*)

val view : model -> msg Vdom.t
(** [view model] returns a Vdom object that contains the html
    representing this puzzle [model] object*)
