open Tea

module N : Puzzle.S = struct
  type button = { label : string; toggled : bool }

  type t = button list

  type model = t

  type msg =
    | Toggle of string  (** All of the possile webpage signals to handle *)

  (** the height of the grid of buttons *)
  let m = 5

  (** the width of the grid of buttons *)
  let n = 4

  (** the list of questions on each button in the meta, reading
      left-right up-down *)

  let questions =
    "resources/twenty_questions.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  let new_button s = { label = s; toggled = false }

  let init () = (List.map new_button questions, Cmd.none)

  (** [toggle s b] flips the state of button b if it has label s *)
  let toggle s b =
    if b.label <> s then b else { b with toggled = not b.toggled }

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed *)
  let update t = function Toggle q -> (List.map (toggle q) t, Cmd.none)

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)
  let view model =
    let open Html in
    div
      [ classList [ ("center-text", true) ] ]
      [ h1 [] [ Printf.sprintf "welcome to navtest!" |> text ] ]
end
