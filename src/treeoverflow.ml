open Tea

module M : Puzzle.S = struct
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
    solved : bool;
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
  type msg = Generate of node | Check of string | Forward of node | Backward
  [@@bs.deriving { accessors }]

  (** [prob] is the base probability that an answer will be hidden in
      the second generation of children. *)
  let prob = 0.9

  (** [rootFeeders] is the list of feeders to each of the root puzzles
      in order*)
  let rootFeeders =
    "static/rootfeeders.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** [dictionary] is a set of (hopefully) non-profane words in the
      English language between 4 and 16 characters long. *)
  let dictionary =
    "static/cleanwords.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** [compassList] is a list of the NATO phonetic alphabet words
      corresponding to each letter in English. *)
  let compassList =
    "static/natophonetic.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** [flagsList] is an association list of words that contain compass
      directions, and the letter whose CrossedFlags encoding uses those
      directions in the word. Precondition: lines in semaphore_words.txt
      are formatted such that the first character is the letter
      encoding, and the rest of the string (after a space) is a possible
      word corresponding to that letter. *)
  let flagsList =
    "static/semaphore_words.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map (fun s -> (s.[0], List.nth (String.split_on_char ' ' s) 1))

  (** [flagtable] is a map from English characters to words that encode
      that letter in the CrossFlags subpuzzle. *)
  let flagTable = Hashtbl.create 26

  (** [incdecList] is an association list of words that contain compass
      directions, and the letter whose GraphDec encoding uses those
      directions in the word. Precondition: lines in semaphore_words.txt
      are formatted such that the first character is the letter
      encoding, and the rest of the string (after a space) is a possible
      word corresponding to that letter. *)
  let incdecList =
    "static/inc_dec_words.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map (fun s -> (s.[0], List.nth (String.split_on_char ' ' s) 1))

  (** [incdecTable] is a map from English characters to words that
      encode that letter in the CrossFlags subpuzzle. *)
  let incdecTable = Hashtbl.create 26

  (** [makeTable wlist] populates a map with the entries from wlist,
      which is an association list with keys mapping to one of the
      elements of a list of possible values. *)
  let rec makeTable tbl = function
    | [] -> ()
    | (c, s) :: t ->
        if Hashtbl.mem tbl c then
          let old_binding = Hashtbl.find tbl c in
          Hashtbl.replace tbl c (s :: old_binding)
        else Hashtbl.add tbl c [ s ];
        makeTable tbl t

  let () = makeTable flagTable flagsList

  let () = makeTable incdecTable incdecList

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
      solved = false;
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
          solved = false;
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
  let find_compass_word c = List.nth compassList (Char.code c - Char.code 'a')

  (** [find_crossflags_word c] finds all words in [dictionary] that
      contain as substrings the semaphore directions corresponding to
      [c], but otherwise no other characters [n, s, e, w].*)
  let find_crossflags_word c =
    let valids = Hashtbl.find flagTable c in
    let idx = Rng.generate (List.length valids) in
    List.nth valids idx

  (** [find_graphdec_word c] finds a word whose characters are all in
      increasing/decreasing order except for c. *)
  let find_graphdec_word c =
    let valids = Hashtbl.find incdecTable c in
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
      | Compass -> find_compass_word
      | CrossFlag -> find_crossflags_word
      | Desktop -> find_busts_word
      | LRArrow -> find_busts_word
      | SOS -> find_busts_word
      | GraphDec -> find_graphdec_word
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
          solved = false;
          (* change this to be dependent on some random generation*)
          puzzle_type = numberSwitch (Rng.generate 7 + 1);
          children = None;
        })

  let init () = ({ head with children = Some (make_root head) }, Cmd.none)

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed *)
  let update t = function
    | Forward n -> init ()
    | Generate n ->
        ignore t.value;
        init ()
    | Backward -> (
        match t.prev with None -> (t, Cmd.none) | Some p -> (p, Cmd.none) )
    | Check s -> init ()

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)

  let view model =
    let open Html in
    div [] []
end
