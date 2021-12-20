open Tea

module M = struct
  type square = {
    valid : bool;
    numbered : bool;
    text : string;
    is_element : bool;
  }
  (** internal representation of a crossword square, which is either
      [valid] (black) or not. It contains text and a boolean
      [is_element] denoting whether the text is a valid chemical element
      abbreviation *)

  type t = { squares : square array array }
  (** internal representation of the model state, containing a grid of
      crossword squares and a saved list of all chemical element
      abbreviations *)

  type model = t

  let name = "bethe"
  let solution = "AUTO AXLE"

  (** file containing the across clues in the crossword *)
  let across =
    "static/acrossclues.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** file containing the down clues in the crossword *)
  let down =
    "static/downclues.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** the row and column size of the crossword (must be square)*)
  let size = 11

  (** a list of tuples denoting the invalid black squares of the
      crossword. each tuple is a 0 indexed coordinate pair, where the
      first number denotes the UP-DOWN height and the second the
      LEFT-RIGHT position, starting from the lower left hand corner*)
  let invalid_squares =
    "static/invalid_sqs.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map (fun s ->
           let coords =
             List.map int_of_string
               (s |> String.trim |> String.split_on_char ' ')
           in
           (List.nth coords 0, List.nth coords 1))

  (**[numbered_squares] is an association list of coordinate - number
     pairs, where the number will be the index in the crossword at that
     coordinate in the crossword. *)
  let numbered_squares =
    "static/numbered_sqs.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map (fun s ->
           s |> String.trim
           |> String.split_on_char ' '
           |> List.map int_of_string
           |> fun lst ->
           ((List.nth lst 0, List.nth lst 1), List.nth lst 2))

  (**[clue nums] is the map that stores bindings from position
     coordinates to the clued number at that box, if it exists. *)
  let clue_nums = Hashtbl.create 50

  (**[fillTable tbl lst] fills the table [tbl] with the values stored in
     [lst] as strings. The elements in [lst] are strings of the form
     [x y idx], where x y are treated as coordinates as a key, and idx
     is the value. *)
  let rec fillTable tbl = function
    | [] -> ()
    | ((a, b), c) :: t ->
        Hashtbl.add tbl (a, b) c;
        fillTable tbl t

  let () = fillTable clue_nums numbered_squares

  type msg =
    | ChangeSquare of {
        text : string;
        pos : int * int;
      }

  (** [load_elements] loads in a staticrce file with a list of elements,
      eliminating uppercase*)
  let elements =
    "static/elements.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map String.lowercase_ascii

  (** [set_invalids squares lst] returns a new square array array where
      some squares within have been marked invalid according to the
      invalid_squres value. *)
  let rec set_invalids squares = function
    | [] -> squares
    | (r, c) :: t ->
        squares.(r).(c) <- { (squares.(r).(c)) with valid = false };
        set_invalids squares t

  (** [set_numbered squares lst] returns a new square array array where
      some squares within have been marked so that they are intended to
      be numbered according to the numbered value. *)
  let rec set_numbered squares = function
    | [] -> squares
    | ((r, c), _) :: t ->
        squares.(r).(c) <- { (squares.(r).(c)) with numbered = true };
        set_numbered squares t

  (** [init] returns an initialized empty crossword puzzle with a
      command to be executed *)
  let init () =
    ( {
        squares =
          set_numbered
            (set_invalids
               (Array.make_matrix size size
                  {
                    valid = true;
                    numbered = false;
                    text = "";
                    is_element = false;
                  })
               invalid_squares)
            numbered_squares;
      },
      Cmd.none )

  (** [check_periodic str] checks to see if provided string matches the
      abbreviation of a chemical element on a standard periodic table,
      case indifferent *)
  let check_periodic str =
    List.mem (String.lowercase_ascii str) elements

  (** [update model msg] returns the puzzle model updated with any text
      change events, along with a command to be executed *)
  let update t = function
    | ChangeSquare { text; pos = r, c } ->
        t.squares.(r).(c) <-
          {
            (t.squares.(r).(c)) with
            text;
            is_element = check_periodic text;
          };
        (t, Cmd.none)

  (** [square_view r c sq] returns the HTML representing a square [sq]
      at position ([r],[c]) in the grid*)
  let square_view (r : int) (c : int) (sq : square) =
    let open Html in
    if sq.valid then
      let box_class_list =
        [ classList [ ("element", sq.is_element) ] ]
      in
      let elts =
        [
          input'
            [
              type' "text";
              value sq.text;
              onInput (fun x -> ChangeSquare { text = x; pos = (r, c) });
              classList [ ("input-box", true) ];
            ]
            [];
        ]
      in
      if sq.numbered then
        let clue_num = Hashtbl.find clue_nums (r, c) in
        let label =
          div
            [ classList [ ("clue-num", true) ] ]
            [ clue_num |> string_of_int |> text ]
        in
        td box_class_list (label :: elts)
      else td box_class_list elts
    else td [ classList [ ("invalid", true) ] ] []

  (** [row_view array r] generates the HTML for the row [r] of crossword
      squares in [arr]. Requires: [arr] contains at least (r+1) rows. *)
  let row_view arr r =
    let open Html in
    tr
      [ classList [ ("cross-row", true) ] ]
      (Array.to_list (Array.mapi (square_view r) arr))

  (** [grid_view arr c] generates the HTML for a crossword array [arr]
      with number of columns [c]. Requires: [arr] contains at least
      (c+1) columns, and [arr] is square.*)
  let rec grid_view arr c =
    match c with
    | -1 -> []
    | x -> row_view arr.(x) x :: grid_view arr (x - 1)

  (** [pad alist dlist] takes in the list of across and down clues,
      respectively, and if one is shorther than the other, it pads the
      shorter list with enough elements to make the lists the same. *)
  let pad alist dlist =
    let diff = List.length alist - List.length dlist in
    match diff with
    | diff when diff < 0 ->
        (alist @ List.init (abs diff) (fun _ -> ""), dlist)
    | _ -> (alist, dlist @ List.init diff (fun _ -> ""))

  (** [clues_helper alist dlist] generates the HTML for the lists of
      across and down clues given by [alist] and [dlist], respectively.
      Precondition: [alist] and [dlist] are the same length. *)
  let rec clues_helper alist dlist =
    let open Html in
    match (alist, dlist) with
    | [], [] -> []
    | h1 :: t1, h2 :: t2 ->
        tr [] [ td [] [ text h1 ]; td [] [ text h2 ] ]
        :: clues_helper t1 t2
    | [], _
    | _, [] ->
        [
          tr []
            [
              td [] [ text "invalid lists" ];
              td [] [ text "invalid lists" ];
            ];
        ]

  let clues_view () =
    let open Html in
    let across', down' = pad across down in
    table
      [ classList [ ("center-margin", true) ] ]
      (tr [] [ th [] [ text "Across" ]; th [] [ text "Down" ] ]
      :: clues_helper across' down')

  (** [view model] returns a Vdom object that contains the HTML
      representing this crossword puzzle [model] object *)
  let view model =
    let open Html in
    div []
      [
        div
          [ classList [ ("home-div", true) ] ]
          [
            p
              [ classList [ ("home-text", true) ] ]
              [
                "A copy of the Cornell Sun with a crossword puzzle on \
                 it. Should be elementary, right?" |> text;
              ];
          ];
        div
          [ classList [ ("cross-grid", true) ] ]
          [
            table
              [ classList [ ("center-margin", true) ] ]
              (grid_view model.squares (size - 1));
          ];
        div []
          [
            table
              [
                classList
                  [ ("center-margin", true); ("clue-grid", true) ];
              ]
              [ clues_view () ];
          ];
      ]
end
