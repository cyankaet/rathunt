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

  type node = {
    prev : node option;
    id : int;
    value : string;
    mutable solved : bool;
    box_text : string;
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
  let rootFeeders = readlines "resources/rootfeeders.txt"

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
  let compassList = readlines "resources/natophonetic.txt"

  let () =
    "resources/semaphore_trim.txt" |> readlines |> makeTable flagTable;
    "resources/inc_dec_words.txt" |> readlines |> makeTable incdecTable;
    "resources/binary_words.txt" |> readlines |> makeTable desktopTable;
    makeTable geminiTable
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
    | 5 -> Gemini
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
      box_text = "";
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
          solved = (if debug then true else false);
          box_text = "";
          puzzle_type = numberSwitch (x + 1);
          children = None;
        })

  (** [random_from_list lst] returns a random element from [lst]. *)
  let random_from_list lst =
    let idx = Rng.generate (List.length lst) in
    List.nth lst idx

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
      | Gemini -> random_from_list (Hashtbl.find geminiTable c)
      | SOS -> random_from_list (Hashtbl.find morseTable c)
      | GraphDec -> random_from_list (Hashtbl.find incdecTable c)
      | _ -> raise (Failure "Root already generated")
    in

    List.init (String.length answer) (fun x ->
        let child_id = (16 * prev.id) + x + 1 in
        {
          prev = Some prev;
          id = child_id;
          value =
            answer |> String.lowercase_ascii
            |> (fun s -> s.[x])
            |> value_creator;
          solved =
            ( if debug then true
            else
              let r = Rng.uniform 1.0 in
              if r > baseprob ** (child_id |> float_of_int |> log) then
                true
              else false );
          (* change this to be dependent on some random generation*)
          box_text = "";
          puzzle_type = numberSwitch (Rng.generate 7 + 1);
          children = None;
        })

  (** [fix_child_ptrs head] ensures that the [prev] pointers of each of
      the nodes in the list in [head]'s children field points to [head].
      Requires: [head.children] is [Some lst], and has already been
      generated. *)
  let fix_child_ptrs head =
    {
      head with
      children =
        ( match head.children with
        | None ->
            print_endline "precondition violated";
            head.children
        | Some child_lst ->
            Some
              (List.map
                 (fun c -> { c with prev = Some head })
                 child_lst) );
    }

  let init () =
    let child_head = { head with children = Some (make_root head) } in
    (fix_child_ptrs child_head, Cmd.none)

  (** [string_clean str] takes a string [str] and returned a capitalized
      string with only capitalized characters *)
  let string_clean str =
    Js.String.(
      toUpperCase str |> trim |> replaceByRe [%bs.re "/[^A-Za]/g"] "")

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed *)
  let update t = function
    | Forward n ->
        if n.children = None then
          let child_head =
            {
              n with
              children = Some (generate n.value n n.puzzle_type);
            }
          in
          (fix_child_ptrs child_head, Cmd.none)
        else (n, Cmd.none)
    | Backward -> (
        match t.prev with
        | None -> (t, Cmd.none)
        | Some p -> (fix_child_ptrs p, Cmd.none) )
    | UpdateText s ->
        if t.solved then ({ t with box_text = "" }, Cmd.none)
        else ({ t with box_text = s }, Cmd.none)
    | Submit ->
        print_endline "Submitting answer";
        let ans = t.box_text in
        if ans <> "" && not t.solved then (
          let guess = string_clean ans = string_clean t.value in
          t.solved <- guess;
          (t, Cmd.none) )
        else ({ t with box_text = "" }, Cmd.none)

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
          ( div
              [ classList [ ("center-margin", true) ] ]
              [
                button
                  [
                    onClick (Forward n); classList [ ("submit", true) ];
                  ]
                  [
                    text
                      ( make_emoji n.puzzle_type
                      ^ " "
                      ^ if n.solved then n.value else "????" );
                  ];
              ]
          :: acc )
          t

  (** [make_child_buttons] returns a div that contains a button for each
      of the current node's children. *)
  let make_child_buttons t =
    match t.children with
    | None -> []
    | Some nlst -> make_child_helper [] nlst

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)

  let view model =
    let open Html in
    div []
      [
        (* title *)
        div [] [ p [] [ text (make_emoji model.puzzle_type) ] ];
        (* submission field *)
        div []
          [
            ( if not model.solved then
              div []
                [
                  p []
                    [
                      input'
                        [
                          type' "text";
                          id "answer-bar";
                          value model.box_text;
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
                          onClick Submit; classList [ ("submit", true) ];
                        ]
                        [ text "Submit" ];
                    ];
                ]
            else p [] [ text "local metapuzzle solved :) " ] );
          ];
        (* list of feeders *)
        div [] (make_child_buttons model);
        (* back button *)
        div
          [ classList [ ("center-margin", true) ] ]
          [
            button
              [ onClick Backward; classList [ ("submit", true) ] ]
              [ text "back" ];
          ];
      ]
end
