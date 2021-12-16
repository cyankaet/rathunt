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
    | Gemini
    | SOS
    | GraphDec

  let string_of_puzzle = function
    | Root -> "root"
    | Busts -> "busts"
    | Compass -> "compass"
    | CrossFlag -> "crossflag"
    | Desktop -> "desktop"
    | Gemini -> "gemini"
    | SOS -> "sos"
    | GraphDec -> "graphdec"

  type data = {
    id : string;
    value : string;
    mutable solved : bool;
    box_text : string;
    puzzle_type : puzzle;
  }

  type node = string * data * string list
  (** AF: a [node] is a tuple consisting of its parent node's id [prev],
      a record [data] containing the node's [id], a string [value]
      consisting of the correct answer at that node, and a puzzle type,
      and a list of children [string list] which may be [\[\]] if it is
      not generated, or the list of ids of its children non-empty if it
      is generated. *)

  type t = node

  type model = t

  let nodedict = Hashtbl.create 1000

  (** All of the possile webpage signals to handle. *)
  type msg =
    | Forward of node
    | Backward
    | UpdateText of string
    | Submit
  [@@bs.deriving { accessors }]

  (** [baseprob] is the base probability that an answer will be hidden
      in the second generation of children. *)
  let baseprob = 0.9

  (**[debug] toggles the hiding of the answers. *)
  let debug = false

  (**[seedlen] is the number of digits at the end of the string for
     which we use to generate the seed integer. *)
  let seedlen = 5

  (**[hexdigit_of_int n] returns the corresponding hexadecimal digit
     corresponding to [n]. If [n] is not between 0-15 inclusive, it
     returns "". *)
  let hexdigit_of_int n =
    if 0 <= n && n <= 9 then n |> string_of_int
    else if 10 <= n && n <= 15 then
      Char.code 'A' + n - 10 |> Char.chr |> Char.escaped
    else ""

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
          ( str.[0],
            List.nth (str |> String.trim |> String.split_on_char ' ') 1
          )
        in
        if Hashtbl.mem tbl c then
          let old_binding = Hashtbl.find tbl c in
          Hashtbl.replace tbl c (s :: old_binding)
        else Hashtbl.add tbl c [ s ];
        makeTable tbl t

  (** [rootFeeders] is the list of feeders to each of the root puzzles
      in order *)
  let rootFeeders = readlines "static/rootfeeders.txt"

  (** [flagtable, incdecTable, desktopTable, lrarrowTable, bustsTable,
      morseTable] is a map from English characters to words that encode
      that letter in the
      [CrossFlags, GraphDec, Desktop, Gemini, Busts, SOS] subpuzzles,
      respectively. *)
  let flagTable = Hashtbl.create 26

  let incdecTable = Hashtbl.create 26

  let desktopTable = Hashtbl.create 26

  let geminiTable = Hashtbl.create 26

  let bustsTable = Hashtbl.create 26

  let morseTable = Hashtbl.create 26

  (** [compassList, flagsList, incdecList, desktopList, lrarrowList,
      bustsList, morseList] is an association list of valid answers to
      [Compass, CrossFlag, GraphDec, Desktop, Gemini, Busts, SOS]
      puzzles, respectively, and their encoded characters (in reverse
      order). *)
  let compassList = readlines "static/natophonetic.txt"

  let () =
    "static/semaphore_trim.txt" |> readlines |> makeTable flagTable;
    "static/inc_dec_words.txt" |> readlines |> makeTable incdecTable;
    "static/binary_words.txt" |> readlines |> makeTable desktopTable;
    makeTable geminiTable
      ( ("static/horizontal_sym.txt" |> readlines)
      @ ("static/vertical_sym.txt" |> readlines)
      @ ("static/rotational_sym.txt" |> readlines)
      @ ("static/none_sym.txt" |> readlines) );
    "static/bustswords.txt" |> readlines |> makeTable bustsTable;
    "static/morse_short.txt" |> readlines |> makeTable morseTable

  (** [numberSwitch n] outputs a puzzle type corresponding to a
      one-indexed initial ordering they are presented. Requires: n is
      between 1 and 7, inclusive. *)
  let numberSwitch = function
    | 2 -> Compass
    | 3 -> CrossFlag
    | 4 -> Desktop
    | 5 -> Gemini
    | 6 -> SOS
    | 7 -> GraphDec
    | _ -> Busts

  (** [head] is the node corresponding to the root of the tree.*)
  let head =
    ( "x",
      {
        id = "0";
        value = "bastion";
        solved = false;
        box_text = "";
        puzzle_type = Root;
      },
      [] )

  let () = Hashtbl.add nodedict "0" head

  (** [make_root n] takes the list of answers in rootfeeders.txt, stored
      in list [rootFeeders], and generates the children list of the node
      of id [n] using the answers in [rootFeeders]. *)
  let make_root n =
    List.init (List.length rootFeeders) (fun x ->
        let child_id = hexdigit_of_int (x + 1) in
        let root_child =
          ( hexdigit_of_int n,
            {
              id = child_id;
              value = List.nth rootFeeders x;
              solved = (if debug then true else false);
              box_text = "";
              puzzle_type = numberSwitch (x + 1);
            },
            [] )
        in
        Hashtbl.add nodedict child_id root_child;
        child_id)

  (** [random_from_list lst] returns a random element from [lst]. *)
  let random_from_list lst =
    let idx = Rng.generate (List.length lst) in
    List.nth lst idx

  (** [generate seed prev puzzle] takes a seed and puzzle type and
      returns the randomly generated list of appropriate children nodes
      of [puzzle] type with random seed given by [seed]. *)
  let generate answer prev puzztype =
    Rng.seed
      ( prev
      |> (fun s ->
           "0x"
           ^
           let l = String.length s in
           if l < seedlen then s else String.sub s (l - seedlen) seedlen)
      |> int_of_string );
    let value_creator c =
      (* print_endline (Char.escaped c); *)
      match puzztype with
      | Busts -> random_from_list (Hashtbl.find bustsTable c)
      | Compass -> List.nth compassList (Char.code c - Char.code 'a')
      | CrossFlag -> random_from_list (Hashtbl.find flagTable c)
      | Desktop -> random_from_list (Hashtbl.find desktopTable c)
      | Gemini -> random_from_list (Hashtbl.find geminiTable c)
      | SOS -> random_from_list (Hashtbl.find morseTable c)
      | GraphDec -> random_from_list (Hashtbl.find incdecTable c)
      | _ -> raise (Failure "Root already generated")
    in
    List.init (String.length answer) (fun x ->
        let child_id = prev ^ hexdigit_of_int (x + 1) in
        let child =
          ( prev,
            {
              id = child_id;
              value =
                answer |> String.lowercase_ascii
                |> (fun s -> s.[x])
                |> value_creator;
              solved =
                ( if debug then true
                else
                  let r = Rng.uniform 1.0 in
                  if
                    r
                    > baseprob
                      ** (String.length child_id |> float_of_int)
                  then true
                  else false );
              (* tweak the above random generation of solved *)
              box_text = "";
              puzzle_type = numberSwitch (Rng.generate 7 + 1);
            },
            [] )
        in
        Hashtbl.add nodedict child_id child;
        child_id)

  let init () =
    match head with
    | prev, data, _ ->
        let generated_head = (prev, data, make_root 0) in
        Hashtbl.add nodedict "0" generated_head;
        (generated_head, Cmd.none)

  (** [string_clean str] takes a string [str] and returned a capitalized
      string with only capitalized characters *)
  let string_clean str =
    Js.String.(
      toUpperCase str |> trim |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed *)
  let update t = function
    | Forward (prev, data, lst) ->
        if lst = [] then (
          let children = generate data.value data.id data.puzzle_type in
          let generated_node = (prev, data, children) in
          Hashtbl.add nodedict data.id generated_node;
          (generated_node, Cmd.none) )
        else ((prev, data, lst), Cmd.none)
    | Backward -> (
        match t with
        | s, _, _ ->
            if s = "x" then (t, Cmd.none)
            else (Hashtbl.find nodedict s, Cmd.none) )
    | UpdateText s -> (
        match t with
        | p, d, clst ->
            if d.solved then
              ((p, { d with box_text = "" }, clst), Cmd.none)
            else ((p, { d with box_text = s }, clst), Cmd.none) )
    | Submit -> (
        print_endline "Submitting answer";
        match t with
        | p, d, clst ->
            let ans = d.box_text in
            if ans <> "" && not d.solved then (
              let guess = string_clean ans = string_clean d.value in
              let solve_node = (p, { d with solved = guess }, clst) in
              Hashtbl.add nodedict d.id solve_node;
              (solve_node, Cmd.none) )
            else ((p, { d with box_text = "" }, clst), Cmd.none) )

  let make_emoji = function
    | Root -> {js|🌱|js}
    | Busts -> {js|👥|js}
    | Compass -> {js|🧭|js}
    | CrossFlag -> {js|🎌|js}
    | Desktop -> {js|🖥️|js}
    | Gemini -> {js|\u264A|js}
    | SOS -> {js|🆘|js}
    | GraphDec -> {js|📉|js}

  let rec make_child_helper acc =
    let open Html in
    function
    | [] -> List.rev acc
    | n :: t ->
        make_child_helper
          (let node_n = Hashtbl.find nodedict n in
           let d =
             match node_n with
             | _, d, _ -> d
           in
           div
             [ classList [ ("center-margin", true) ] ]
             [
               button
                 [
                   onClick (Forward node_n);
                   classList [ ("puzzle-nav-tree", true) ];
                 ]
                 [
                   text
                     ( make_emoji d.puzzle_type
                     ^ " - "
                     ^
                     if d.solved then String.uppercase_ascii d.value
                     else "????" );
                 ];
             ]
           :: acc)
          t

  (** [make_child_buttons] returns a div that contains a button for each
      of the current node's children. *)
  let make_child_buttons t =
    match t with
    | _, _, clst -> make_child_helper [] clst

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)

  let view (model : node) =
    let open Html in
    match model with
    | _, d, _ ->
        div []
          [
            (* title *)
            div []
              [
                p []
                  [
                    text
                      ( make_emoji d.puzzle_type
                      ^ " Minipuzzle " ^ d.id ^ ": "
                      ^
                      if d.solved then String.uppercase_ascii d.value
                      else "????" );
                  ];
              ];
            (* submission field *)
            div []
              [
                ( if not d.solved then
                  div []
                    [
                      p []
                        [
                          input'
                            [
                              type' "text";
                              id "answer-bar";
                              value d.box_text;
                              onInput (fun s -> UpdateText s);
                              placeholder "Enter Answer Here";
                            ]
                            [];
                        ];
                      div
                        [ classList [ ("center-margin", true) ] ]
                        [
                          button
                            [
                              onClick Submit;
                              classList [ ("submit-tree", true) ];
                            ]
                            [ text "Submit" ];
                        ];
                    ]
                else p [] [ text ("SOLVED! " ^ {js|😃|js}) ] );
              ];
            (* back button *)
            div
              [ classList [ ("center-margin", true) ] ]
              [
                button
                  [
                    onClick Backward;
                    classList [ ("submit-tree", true) ];
                  ]
                  [ text "Back" ];
              ];
            (* list of feeders *)
            div [] (make_child_buttons model);
          ]
end
