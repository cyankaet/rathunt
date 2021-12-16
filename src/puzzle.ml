module type S = sig
  type t
  (** The abstract type of values representing a puzzle to be solved *)

  type model = t

  val name : string

  type msg
  (** All of the possile webpage signals to handle *)

  val init : unit -> t * 'a Tea.Cmd.t

  val update : t -> msg -> t * 'a Tea.Cmd.t
  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed *)

  val view : t -> msg Vdom.t
  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)
end
