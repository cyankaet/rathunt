open Tea

module M (* : Puzzle.S *) = struct
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

  type t = node

  type model = t

  (** All of the possile webpage signals to handle *)
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

  let numberSwitch = function
    | 2 -> Compass
    | 3 -> CrossFlag
    | 4 -> Desktop
    | 5 -> LRArrow
    | 6 -> SOS
    | 7 -> GraphDec
    | _ -> Busts

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

  let make_busts answer n =
    Rng.seed n.id;
    List.init (String.length answer) (fun x ->
        {
          prev = Some n;
          id = (16 * n.id) + x + 1;
          value =
            answer |> String.lowercase_ascii
            |> (fun s -> s.[x])
            |> find_busts_word;
          puzzle_type = numberSwitch (Rng.generate 7 + 1);
          children = None;
        })

  let make_compass answer n =
    Rng.seed n.id;
    List.init (String.length answer) (fun x ->
        {
          prev = Some n;
          id = (16 * n.id) + x + 1;
          value =
            List.nth compassList
              ( ( answer |> String.lowercase_ascii
                |> (fun s -> s.[x])
                |> Char.code )
              - Char.code 'a' );
          puzzle_type = numberSwitch (Rng.generate 7 + 1);
          children = None;
        })

  (** [generate seed prev puzzle] takes a seed and puzzle type and
      returns the randomly generated list of appropriate children nodes
      of [puzzle] type with random seed given by [seed]. *)
  let generate answer prev = function
    | Root -> make_root prev
    | Busts -> []
    | Compass -> make_compass answer prev
    | CrossFlag -> []
    | Desktop -> []
    | LRArrow -> []
    | SOS -> []
    | GraphDec -> []

  let init () =
    ({ head with children = Some (generate "" head Root) }, Cmd.none)

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