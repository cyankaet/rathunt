open Tea

module M = struct
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
  type msg =
    | Check of string
    | Forward of node
    | Backward
  [@@bs.deriving { accessors }]

  (** [baseprob] is the base probability that an answer will be hidden
      in the second generation of children. *)
  let baseprob = 0.9

  (** [readlines s] reads in the lines in [s] *)
  let readlines s =
    s |> Node.Fs.readFileAsUtf8Sync |> String.split_on_char '\n'

  (** [makeTable wlist] populates a map with the entries from wlist,
      which is an association list with keys mapping to one of the
      elements of a list of possible values. *)
  let rec makeTable tbl = function
    | [] -> ()
    | str :: t ->
        let c, s =
          (str.[0], List.nth (String.split_on_char ' ' str) 1)
        in
        if Hashtbl.mem tbl c then
          let old_binding = Hashtbl.find tbl c in
          Hashtbl.replace tbl c (s :: old_binding)
        else Hashtbl.add tbl c [ s ];
        makeTable tbl t

  (** [rootFeeders] is the list of feeders to each of the root puzzles
      in order *)
  let rootFeeders = readlines "resources/rootfeeders.txt"

  (** [flagtable, incdecTable, desktopTable, lrarrowTable, bustsTable,
      morseTable] is a map from English characters to words that encode
      that letter in the
      [CrossFlags, GraphDec, Desktop, LRArrow, Busts, SOS] subpuzzles,
      respectively. *)
  let flagTable = Hashtbl.create 26

  let incdecTable = Hashtbl.create 26

  let desktopTable = Hashtbl.create 26

  let lrarrowTable = Hashtbl.create 26

  let bustsTable = Hashtbl.create 26

  let morseTable = Hashtbl.create 26

  (** [compassList, flagsList, incdecList, desktopList, lrarrowList,
      bustsList, morseList] is an association list of valid answers to
      [Compass, CrossFlag, GraphDec, Desktop, LRArrow, Busts, SOS]
      puzzles, respectively, and their encoded characters (in reverse
      order). *)
  let compassList = readlines "resources/natophonetic.txt"

  let () =
    "resources/semaphore_trim.txt" |> readlines |> makeTable flagTable;
    "resources/inc_dec_words.txt" |> readlines |> makeTable incdecTable;
    "resources/binary_words.txt" |> readlines |> makeTable desktopTable;
    makeTable lrarrowTable
      ( ("resources/horizontal_sym.txt" |> readlines)
      @ ("resources/vertical_sym.txt" |> readlines)
      @ ("resources/rotational_sym.txt" |> readlines)
      @ ("resources/none_sym.txt" |> readlines) );
    "resources/bustswords.txt" |> readlines |> makeTable bustsTable;
    "resources/morse_short.txt" |> readlines |> makeTable morseTable

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

  (** [random_from_list lst] returns a random element from [lst]. *)
  let random_from_list lst =
    let idx = Rng.generate (List.length lst) in
    List.nth lst idx

  (** [explode s] breaks up a string s into a list of constituent
      one-character strings, which have length 1. *)
  let rec explode s =
    if String.length s = 0 then []
    else
      let h = Char.escaped s.[0] in
      let t = String.sub s 1 (String.length s - 1) in
      h :: explode t

  (** [find_sos_word c] generates a valid answer in [dictionary] to a
      SOS puzzle that encodes character [c]. *)

  (* let explodedList = explode (List.nth morseList (Char.code c -
     Char.code 'a')) in let rx = "/\b([^oi]*" ^ String.concat "[^oi]*"
     explodedList ^ "[^oi]*)\b/" in random_from_list (List.filter (fun s
     -> match Js.String.match_ (Js.Re.fromString rx) s with | None ->
     false | Some _ -> true) dictionary) *)

  (** [generate seed prev puzzle] takes a seed and puzzle type and
      returns the randomly generated list of appropriate children nodes
      of [puzzle] type with random seed given by [seed]. *)
  let generate answer prev puzztype =
    Rng.seed prev.id;
    let value_creator c =
      match puzztype with
      | Busts -> random_from_list (Hashtbl.find bustsTable c)
      | Compass -> List.nth compassList (Char.code c - Char.code 'a')
      | CrossFlag -> random_from_list (Hashtbl.find flagTable c)
      | Desktop -> random_from_list (Hashtbl.find desktopTable c)
      | LRArrow -> random_from_list (Hashtbl.find lrarrowTable c)
      | SOS -> random_from_list (Hashtbl.find morseTable c)
      | GraphDec -> random_from_list (Hashtbl.find incdecTable c)
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
          solved = true;
          (* change this to be dependent on some random generation*)
          puzzle_type = numberSwitch (Rng.generate 7 + 1);
          children = None;
        })

  let init () =
    ({ head with children = Some (make_root head) }, Cmd.none)

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed *)
  let update t = function
    | Forward n ->
        if n.children = None then
          ( { n with children = Some (generate n.value n n.puzzle_type) },
            Cmd.none )
        else (n, Cmd.none)
    | Backward -> (
        match t.prev with
        | None -> (t, Cmd.none)
        | Some p -> (p, Cmd.none) )
    | Check s ->
        if s = t.value then ({ t with solved = true }, Cmd.none)
        else (t, Cmd.none)

  let make_emoji = function
    | Root -> "U+1F331"
    | Busts -> "U+1F465"
    | Compass -> "🧭"
    | CrossFlag -> "🎌"
    | Desktop -> "🖥️"
    | LRArrow -> "↔️"
    | SOS -> "🆘"
    | GraphDec -> "📉"

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)

  let view model =
    let open Html in
    div [] [ p [] [ text (make_emoji model.puzzle_type) ] ]
end
