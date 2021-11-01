open Tea

module M (* : Puzzle.S *) = struct
  (** variant corresponding to all of the different types of subpuzzles
      present*)
  type puzzle =
    | Root
    | Busts
    | Compass
    | CrossFlag
    | Desktop
    | LRArrow
    | SOS
    | GraphDec

  type node = {
    prev : node option;
    id : int;
    value : string;
    puzzle_type : puzzle;
    children : node list option;
  }
  (** AF: a [node] consists of its parent [prev], its [id], a string
      [value] consisting of the correct answer at that stage, a puzzle
      type, and a list of children which may be None if it is not
      generated, or Some node list if it is generated. *)

  type t = node

  type model = t

  (** All of the possile webpage signals to handle. *)
  type msg =
    | Generate of node
    | Rng of puzzle
    | Forward
    | Backward
  [@@bs.deriving { accessors }]

  (** [rootFeeders] is the list of feeders to each of the root puzzles
      in order*)
  let rootFeeders =
    "resources/rootfeeders.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** [dictionary] is a set of (hopefully) non-profane words in the
      English language between 4 and 16 characters long. *)
  let dictionary =
    "resources/cleanwords.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** [compassList] is a list of the NATO phonetic alphabet words
      corresponding to each letter in English. *)
  let compassList =
    "resources/natophonetic.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** [flagsList] is a list of the semaphore flag positions
      corresponding to each letter in English. *)
  let flagsList =
    "resources/semaphore.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** [numberSwitch n] outputs a puzzle type corresponding to a
      one-indexed initial ordering they are presented. Requires: n is
      between 1 and 7, inclusive. *)
  let numberSwitch = function
    | 2 -> Compass
    | 3 -> CrossFlag
    | 4 -> Desktop
    | 5 -> LRArrow
    | 6 -> SOS
    | 7 -> GraphDec
    | _ -> Busts

  (** [head] is the node corresponding to the root of the tree.*)
  let head =
    {
      prev = None;
      id = 0;
      value = "bastion";
      puzzle_type = Root;
      children = None;
    }

  (** [make_root n] takes the list of answers in rootfeeders.txt, stored
      in list [rootFeeders], and generates the children list of node [n]
      using the answers in [rootFeeders]. *)
  let make_root n =
    List.init (List.length rootFeeders) (fun x ->
        {
          prev = Some n;
          id = x + 1;
          value = List.nth rootFeeders x;
          puzzle_type = numberSwitch (x + 1);
          children = None;
        })

  (** [find_busts_word c] finds all words in [dictionary] that have a
      double letter c in the word. *)
  let find_busts_word c =
    let rx = "/^\\w*" ^ String.make 2 c ^ "\\w*/" in
    let valids =
      List.filter
        (fun s ->
          match Js.String.match_ (Js.Re.fromString rx) s with
          | None -> false
          | Some _ -> true)
        dictionary
    in
    let idx = Rng.generate (List.length valids) in
    List.nth valids idx

  (** [find_compass_word c] returns the NATO phonetic word corresponding
      to the character [c]. *)
  let find_compass_word c =
    List.nth compassList (Char.code c - Char.code 'a')

  (** [find_crossflags_word c] finds all words in [dictionary] that
      contain as substrings the semaphore directions corresponding to
      [c], but otherwise no other characters [n, s, e, w]. CURRENTLY NOT
      IMPLEMENTED CORRECTLY.*)
  let find_crossflags_word c =
    let rx = "/^\\w*" ^ String.make 2 c ^ "\\w*/" in
    let valids =
      List.filter
        (fun s ->
          match Js.String.match_ (Js.Re.fromString rx) s with
          | None -> false
          | Some _ -> true)
        dictionary
    in
    let idx = Rng.generate (List.length valids) in
    List.nth valids idx

  (** [generate seed prev puzzle] takes a seed and puzzle type and
      returns the randomly generated list of appropriate children nodes
      of [puzzle] type with random seed given by [seed]. *)
  let generate answer prev puzztype =
    Rng.seed prev.id;
    let value_creator =
      match puzztype with
      | Busts -> find_busts_word
      | Compass -> find_crossflags_word
      | CrossFlag -> find_busts_word
      | Desktop -> find_busts_word
      | LRArrow -> find_busts_word
      | SOS -> find_busts_word
      | GraphDec -> find_busts_word
      | _ -> raise (Failure "Root already generated")
    in
    List.init (String.length answer) (fun x ->
        {
          prev = Some prev;
          id = (16 * prev.id) + x + 1;
          value =
            answer |> String.lowercase_ascii
            |> (fun s -> s.[x])
            |> value_creator;
          puzzle_type = numberSwitch (Rng.generate 7 + 1);
          children = None;
        })

  let init () =
    ({ head with children = Some (make_root head) }, Cmd.none)

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed *)
  let update t = function
    | Generate n ->
        ignore t.value;
        init ()

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)

  (* let view = () *)
end
