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
            div [ id "container" ]
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
                        classList [ ("rat-img", true) ];
                      ]
                      [];
                  ];
              ];
            td [] [ text (List.nth enums idx1) ];
            td
              [ classList [ ("emoji-size", true) ] ]
              [ text emoji_lookup.(idx2) ];
            div [ id "container" ]
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
                        (* figure out what actually goes here once we
                           figure out static serving of images *)
                        classList [ ("rat-img", true) ];
                      ]
                      [];
                  ];
              ];
            td [] [ text (List.nth enums idx2) ];
          ])

  (**[get_button_class square] returns the class name for the CSS
     styling corresponding to [square] *)
  let get_button_class = function
    | Filled -> ("square-empty", true)
    | Crossed -> ("square-empty", true)
    | Empty -> ("square-empty", true)

  (**[button_row model] returns a row of buttons *)
  let button_row model row =
    let open Html in
    tr []
      (List.init cols (fun x ->
           button
             [
               onClick (ChangeSquare (row, x));
               classList [ get_button_class model.(row).(x) ];
             ]
             []))

  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)
  let view model =
    let open Html in
    div []
      [
        (* table *)
        div []
          [
            table
              [ classList [ ("center-margin", true) ] ]
              (img_rows 0 20);
          ];
        hr [] [];
        (* nonogram *)
        div []
          [
            table []
              (List.init rows (fun r -> button_row model.nonagram r));
          ];
      ]
end
