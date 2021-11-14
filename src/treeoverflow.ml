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
  type msg =
    | Check of string
    | Forward of node
    | Backward
  [@@bs.deriving { accessors }]

  (** [baseprob] is the base probability that an answer will be hidden
      in the second generation of children. *)
  let baseprob = 0.9

  (** [readlines s] reads in the lines in [s].txt *)
  let readlines s =
    "resources/" ^ s ^ ".txt"
    |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** [charassoc_from_lns lst] creates an association list of characters
      to strings from a list of lines. Precondition: The two characters
      in each line are an English letter and a space, and the rest of
      the line is a string. *)
  let charassoc_from_lns =
    List.map (fun s -> (s.[0], List.nth (String.split_on_char ' ' s) 1))

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

  (** [rootFeeders] is the list of feeders to each of the root puzzles
      in order *)
  let rootFeeders = readlines "rootfeeders"

  (** [dictionary] is a set of non-profane words in the English language
      between 4 and 16 characters long. *)
  let dictionary = readlines "cleanwords"

  (** [compassList] is a list of valid answers to Compass puzzles. *)
  let compassList = readlines "natophonetic"

  (** [flagsList] is an association list of valid answers to CrossFlag
      puzzles and their encoded characters (in reverse order). *)
  let flagsList = "semaphore_words" |> readlines |> charassoc_from_lns

  (** [incdecList] is an association list of valid answers to GraphDec
      puzzles and their encoded characters (in reverse order). *)
  let incdecList = "inc_dec_words" |> readlines |> charassoc_from_lns

  (** [desktopList] is an association list of valid answers to Desktop
      puzzles and their encoded characters (in reverse order). *)
  let desktopList = "binary_words" |> readlines |> charassoc_from_lns

  (** [lrarrowList] is an association list of valid answers to LRArrow
      puzzles and their encoded characters (in reverse order).*)
  let lrarrowList =
    ("horizontal_sym" |> readlines |> charassoc_from_lns)
    @ ("vertical_sym" |> readlines |> charassoc_from_lns)
    @ ("rotational_sym" |> readlines |> charassoc_from_lns)
    @ ("none_sym" |> readlines |> charassoc_from_lns)

  (**[morseList] is a list containing the Morse encoding of every letter
     in the English alphabet, in order, but with [i] instead of [-] and
     [o] instead of [.].*)
  let morseList =
    "morse" |> readlines
    |> List.map (fun s ->
           String.map
             (fun c ->
               if c = '-' then 'i' else if c = '.' then 'o' else c)
             s)

  (** [flagtable] is a map from English characters to words that encode
      that letter in the CrossFlags subpuzzle. *)
  let flagTable = Hashtbl.create 26

  (** [incdecTable] is a map from English characters to words that
      encode that letter in the CrossFlags subpuzzle. *)
  let incdecTable = Hashtbl.create 26

  (** [desktopTable] is a map from English characters to words that
      encode that letter in the CrossFlags subpuzzle. *)
  let desktopTable = Hashtbl.create 26

  (** [lrarrowTable] is a map from English characters to words that
      encode that letter in the CrossFlags subpuzzle. *)
  let lrarrowTable = Hashtbl.create 26

  let () = makeTable flagTable flagsList

  let () = makeTable incdecTable incdecList

  let () = makeTable desktopTable desktopList

  let () = makeTable lrarrowTable lrarrowList

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

  (** [find_busts_word c] generates a valid answer to a Busts puzzle in
      [dictionary] that encodes character [c] *)
  let find_busts_word c =
    let rx = "/^\\w*" ^ String.make 2 c ^ "\\w*/" in
    random_from_list
      (List.filter
         (fun s ->
           match Js.String.match_ (Js.Re.fromString rx) s with
           | None -> false
           | Some _ -> true)
         dictionary)

  (** [find_compass_word c] generates a valid answer to a Compass puzzle
      that encodes character [c]. *)
  let find_compass_word c =
    List.nth compassList (Char.code c - Char.code 'a')

  (** [find_crossflags_word c] generates a valid answer in [dictionary]
      to a CrossFlags puzzle that encodes character [c]. *)
  let find_crossflags_word c =
    random_from_list (Hashtbl.find flagTable c)

  (** [find_graphdec_word c] generates a valid answer in [dictionary] to
      a GraphDec puzzle that encodes character [c]. *)
  let find_graphdec_word c =
    random_from_list (Hashtbl.find incdecTable c)

  (** [find_desktop_word c] generates a valid answer in [dictionary] to
      a Desktop puzzle that encodes character [c]. *)
  let find_desktop_word c =
    random_from_list (Hashtbl.find desktopTable c)

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
  let find_sos_word c =
    let explodedList =
      explode (List.nth morseList (Char.code c - Char.code 'a'))
    in
    let rx =
      "/\b([^oi]*" ^ String.concat "[^oi]*" explodedList ^ "[^oi]*)\b/"
    in
    random_from_list
      (List.filter
         (fun s ->
           match Js.String.match_ (Js.Re.fromString rx) s with
           | None -> false
           | Some _ -> true)
         dictionary)

  (** [find_lrarrow_word c] generates a valid answer in [dictionary] to
      a LRArrow puzzle that encodes character [c]. *)
  let find_lrarrow_word c =
    random_from_list (Hashtbl.find lrarrowTable c)

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
      | Desktop -> find_desktop_word
      | LRArrow -> find_lrarrow_word
      | SOS -> find_sos_word
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

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)

  let view model =
    let open Html in
    div [] []
end
