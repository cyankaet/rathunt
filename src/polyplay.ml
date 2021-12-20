open Tea

(* SPEC: The page should consist of the following two parts:

   1. A nonogram grid. This is a common type of logic puzzle - look this
   up for some references. This is a 25 x 15 grid (rows x columns) with
   clues on the top and to the left that indicate the runs of filled
   squares in the solution to the nonogram. You can find the intended
   nonogram pinned in #puzzle-ideas. Each square should be a clickable
   button that can either be filled, crossed-out, or empty. This should
   be implemented so that clicking the squares cycles them between these
   three states, in that order. Don't worry about the clues yet -- the
   numbers in the clues to the left and top need to be replaced by
   emojis in a specific way - in particular, they need to be such that
   1's are replaced with game pieces whose value is 1, etc. (This
   correspondence should be hard-coded.) You can decide in
   implementation whether or not you want to do this replacement
   pseudorandomly or not, if you get there.

   All of these tasks are fairly straightforward. Studying the
   implementation of crossword will help, but ultimately a lot of this
   (read: like 80%) is still base OCaml and should quite frankly not be
   difficult. *)

module M : Puzzle.S = struct
  type square =
    | Filled
    | Crossed
    | Empty

  type t = { nonagram : square array array }
  (** AF: [boxes] is a [string array] that holds the strings in the
      answer checking boxes at any given poit, and [grid] is a
      [square array array] that holds the state of buttons in the grid. *)

  type model = t

  let name = "cook"

  (** All of the possible webpage signals to handle. I'm pretty sure
      this is everything one might want, please think and add more if
      needed when implementing update, or if you want to change the type
      of the messages. *)
  type msg = ChangeSquare of int * int [@@bs.deriving { accessors }]

  let total_clues = 20

  (**[enums] is a list of the length of the enumerations of the answers
     to each clue. Requires: length of enums is [total_clues].*)
  let enums =
    "static/pieces.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map String.lowercase_ascii

  let rows = 25

  let cols = 15

  (**[init ()] returns the puzzle model in its initial state. *)
  let init () =
    ({ nonagram = Array.make_matrix rows cols Empty }, Cmd.none)

  (* Given a square of the nonagram, return the next stage it should
     move to if clicked on *)
  let next_stage s =
    match s with
    | Empty -> Filled
    | Filled -> Crossed
    | Crossed -> Empty

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed. *)
  let update t = function
    | ChangeSquare (r, c) ->
        Printf.printf "updating";
        t.nonagram.(r).(c) <- next_stage t.nonagram.(r).(c);
        (t, Cmd.none)

  (**[emoji_lookup] is a list of emojis corresponding to each clue.
     Requires: length of [emoji_lookup] is [total_clues].*)
  let emoji_lookup =
    [|
      {js|🏛️|js};
      {js|🐆|js};
      {js|🎃|js};
      {js|⭐|js};
      {js|🌸|js};
      {js|⚔️|js};
      {js|🏫|js};
      {js|🎖️|js};
      {js|🍂|js};
      {js|♟️|js};
      {js|🚂|js};
      {js|🍣|js};
      {js|🕊️|js};
      {js|🛣️|js};
      {js|💣|js};
      {js|🏵️|js};
      {js|🦅|js};
      {js|🏙️|js};
      {js|🐀|js};
      {js|🔄|js};
    |]

  (** [random_from_list lst] returns a random element from [lst]. *)
  let random_from_list lst =
    let idx = Rng.generate (List.length lst) in
    List.nth lst idx

  (* The set of hints above the nonogram. Each square will be empty or
     have an emoji in it. *)
  let toprow =
    "static/nonagramtoprow.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map (String.split_on_char ' ')
    |> List.map (List.map int_of_string)

  (* The set of hints to the side of the nonogram. Each square will be
     empty or have an emoji in it. *)
  let siderow =
    "static/nonagramsiderow.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map (String.split_on_char ' ')
    |> List.map (List.map int_of_string)

  (* Nonogram hints normally have numbers in them. In our nonogram,
     these numbers are replaced with emojis, and participants will have
     to find out which emoji corresponds to which number. Emojinums
     matches each number to a list emojis that can represent it.*)
  let emojinums =
    "static/num_to_emoji.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map (String.split_on_char ' ')
    |> List.map (List.map int_of_string)

  (* Given a certain number, picks an emoji that corresponds to it. *)
  let pick_emoji n =
    emoji_lookup.(random_from_list (List.nth emojinums (n - 1)))

  let hint_square_view (num : int) =
    let open Html in
    if num = 0 then td [ classList [ ("grid-filled", true) ] ] []
    else
      td
        [ classList [ ("clue-emoji-size", true) ] ]
        [ text (pick_emoji num) ]

  (** [square_view r c sq] returns the HTML representing a square [sq]
      at position ([r],[c]) in the grid*)
  let square_view (r : int) (c : int) (sq : square) =
    let open Html in
    let switch =
      button
        [
          onClick (ChangeSquare (r, c));
          classList [ ("square-button", true) ];
        ]
        [ (if sq = Crossed then "X" else "") |> text ]
    in
    match sq with
    | Empty -> td [] [ switch ]
    | Filled -> td [ classList [ ("grid-filled", true) ] ] [ switch ]
    | Crossed -> td [ classList [ ("grid-crossed", true) ] ] [ switch ]

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
    | x -> row_view arr.(24 - x) (24 - x) :: grid_view arr (x - 1)

  (**[emoji_rows_view rows] takes a 2d list of integers and retuns a 2d
     array of td's with a correct corresponding emoji in each position. *)
  let rec emoji_rows_view rows =
    match rows with
    | [] -> []
    | row :: t ->
        let open Html in
        tr [] (List.map (fun x -> hint_square_view x) row)
        :: emoji_rows_view t

  (**[img_rows pos elts] generates [elts]/2 rows starting at index [pos]
     in the ordering of the emojis above with the appropriate emoji,
     image, and enumeration, with wrap-around (starts back again at 0
     after reaching the end of the array), paired such that each row
     containts two elements that are [elts]/2 apart in the list.
     Precondition: the number of intended elements to display is even,
     and the number of images to load is exactly [elts] *)
  let img_rows pos elts =
    List.init (elts / 2) (fun x ->
        let open Html in
        let idx1 = (x + pos) mod elts in
        let idx2 = (x + pos + (elts / 2)) mod elts in
        tr []
          [
            td
              [ classList [ ("emoji-size", true) ] ]
              [ text emoji_lookup.(idx1) ];
            div [ id "poly-container" ]
              [
                td
                  [ classList [ ("image-container", true) ] ]
                  [
                    img
                      [
                        src
                          ( "play_imgs_final/img-"
                          ^ string_of_int (idx1 + 1)
                          ^ ".png" );
                      ]
                      [];
                  ];
              ];
            td [] [ text (List.nth enums idx1) ];
            td
              [ classList [ ("emoji-size", true) ] ]
              [ text emoji_lookup.(idx2) ];
            div [ id "poly-container" ]
              [
                td
                  [ classList [ ("image-container", true) ] ]
                  [
                    img
                      [
                        src
                          ( "play_imgs_final/img-"
                          ^ string_of_int (idx2 + 1)
                          ^ ".png" );
                        classList [ ("rat-img", true) ];
                      ]
                      [];
                  ];
              ];
            td [] [ text (List.nth enums idx2) ];
          ])

  let random_top_rows = emoji_rows_view toprow

  let random_side_rows = emoji_rows_view siderow

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)
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
                "It's game night! You walk into a room with \
                 challengers lining two of the walls, with their hands \
                 of game pieces showing. It's time for you to break \
                 out the 200 IQ logic strats - what's your trump card?"
                |> text;
              ];
          ];
        (* table *)
        div []
          [
            table
              [ classList [ ("center-margin", true) ] ]
              (img_rows 0 total_clues);
          ];
        hr [] [];
        (* nonogram *)
        div []
          [
            table
              [ classList [ ("center-margin", true) ] ]
              [
                tr [] [ td [] []; td [] random_top_rows ];
                tr []
                  [
                    td [] random_side_rows;
                    td []
                      [
                        div
                          [ classList [ ("nonagram", true) ] ]
                          [
                            table
                              [ classList [ ("center-margin", true) ] ]
                              (grid_view model.nonagram 24);
                          ];
                      ];
                  ];
              ];
          ];
      ]
end
