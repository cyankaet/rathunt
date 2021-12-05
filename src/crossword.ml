open Tea

module M = struct
  type square = {
    valid : bool;
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

  (** file containing the across clues in the crossword *)
  let across =
    "resources/acrossclues.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** file containing the down clues in the crossword *)
  let down =
    "resources/downclues.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'

  (** the row and column size of the crossword (must be square)*)
  let size = 11

  (** a list of tuples denoting the invalid black squares of the
      crossword. each tuple is a 0 indexed coordinate pair, where the
      first number denotes the UP-DOWN height and the second the
      LEFT-RIGHT position, starting from the lower left hand corner*)
  let invalid_squares =
    [
      (0, 0);
      (0, 1);
      (0, 5);
      (0, 6);
      (1, 0);
      (1, 5);
      (2, 2);
      (2, 7);
      (2, 8);
      (3, 6);
      (3, 10);
      (4, 3);
      (4, 4);
      (4, 9);
      (4, 10);
      (5, 0);
      (5, 1);
      (5, 5);
      (5, 9);
      (5, 10);
      (6, 0);
      (6, 1);
      (6, 6);
      (6, 7);
      (7, 0);
      (7, 4);
      (8, 2);
      (8, 3);
      (8, 8);
      (9, 5);
      (9, 10);
      (10, 4);
      (10, 5);
      (10, 9);
      (10, 10);
    ]

  type msg =
    | ChangeSquare of {
        text : string;
        pos : int * int;
      }

  (** [load_elements] loads in a resource file with a list of elements,
      eliminating uppercase*)
  let elements =
    "resources/elements.txt" |> Node.Fs.readFileAsUtf8Sync
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

  (** [init] returns an initialized empty crossword puzzle with a
      command to be executed *)
  let init () =
    ( {
        squares =
          set_invalids
            (Array.make_matrix size size
               { valid = true; text = ""; is_element = false })
            invalid_squares;
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
      td
        [ classList [ ("element", sq.is_element) ] ]
        [
          input'
            [
              type' "text";
              value sq.text;
              onInput (fun x -> ChangeSquare { text = x; pos = (r, c) });
            ]
            [];
        ]
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
      ( tr [] [ th [] [ text "Across" ]; th [] [ text "Down" ] ]
      :: clues_helper across' down' )

  (** [view model] returns a Vdom object that contains the HTML
      representing this crossword puzzle [model] object *)
  let view model =
    let open Html in
    div []
      [
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
