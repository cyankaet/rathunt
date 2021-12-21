open Tea

module M = struct
  (** all possible messages to handle from the site *)
  type msg =
    | ChangeMonth of int * int
    | ChangeDate of int * int
    | Check

  type dropdown = {
    month : int;
    date : int;
    correct : bool;
  }

  type t = dropdown array
  (** internal representation of the model state, containing the state
      of each dropdown - an indicator of whether the guess is correct or
      not, and the state of the dropdowns themselves. *)

  type model = t

  let name = "keeton"

  let solution = "GEM"

  (**[num_dates] is the number of songs/dates to be considered in the
     puzzle.*)
  let num_dates = 10

  (**[party_dates] are the correct dates for each dropdown, stored as
     (int, int) pairs*)
  let party_dates =
    "static/party_days.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map (fun s ->
           let pairs =
             List.map int_of_string (String.split_on_char ' ' s)
           in
           (List.nth pairs 0, List.nth pairs 1))

  (**[guest_nums] is a list of integers of length [num_dates] that
     stores how many images need to be displayed in each of the lines. *)
  let guest_nums =
    "static/guest_nums.txt" |> Node.Fs.readFileAsUtf8Sync
    |> String.split_on_char '\n'
    |> List.map int_of_string

  (** [init] returns an initialized empty puzzle with a command to be
      executed *)
  let init () =
    ( Array.init num_dates (fun _ ->
          { month = 1; date = 1; correct = false }),
      Cmd.none )

  (**[date_checker model pos lst] checks if the dates stored in the
     array [model] starting at position [pos] match the dates stored in
     [lst], for however many elements there are remaining in [lst], and
     updates the stored entry in the array to be correct if it is.
     Requires: [lst] has length shorter than [num_dates - pos]. *)
  let rec date_checker model pos = function
    | [] -> ()
    | (m, d) :: t ->
        let drop = model.(pos) in
        model.(pos) <-
          { drop with correct = drop.month = m && drop.date = d };
        date_checker model (pos + 1) t

  (** [update model msg] returns the puzzle model updated with any text
      change events, along with a command to be executed *)
  let update t = function
    | ChangeDate (p, d') ->
        let drop_p = t.(p) in
        t.(p) <- { drop_p with date = d' };
        (t, Cmd.none)
    | ChangeMonth (p, m') ->
        let drop_p = t.(p) in
        t.(p) <- { drop_p with month = m' };
        (t, Cmd.none)
    | Check ->
        date_checker t 0 party_dates;
        (t, Cmd.none)

  (**[emoji_of_row n] returns the emoji associated with row [n], if any.*)
  let emoji_of_row = function
    | 0 -> {js|🦔|js}
    | 1 -> {js|🌑|js}
    | 2 -> {js|➕|js}
    | 3 -> {js|☀️|js}
    | 4 -> {js|🍀|js}
    | 5 -> {js|🦃|js}
    | 6 -> {js|👻|js}
    | 7 -> {js|☪️|js}
    | 8 -> {js|🌎|js}
    | 9 -> {js|🌟|js}
    | _ -> {js|❌|js}

  (**[image_list n] returns the list of img classes that are to be
     displayed in row [n].*)
  let image_list n =
    let open Html in
    td
      [ id "records-container" ]
      ( td [] [ "Ft. " |> text ]
      :: List.init (List.nth guest_nums n) (fun x ->
             td
               [ classList [ ("guest-box", true) ] ]
               [
                 img
                   [
                     src
                       ( "records_guests/"
                       ^ string_of_int (n + 1)
                       ^ "-"
                       ^ string_of_int (x + 1)
                       ^ ".png" );
                     classList [ ("guest-imgs", true) ];
                   ]
                   [];
               ]) )

  (**[selector model n month] makes the month selector for row [n] in
     the table if [m] is true, with the selected value given as in
     [model], and otherwise makes the date selector. *)
  let selector model n m =
    let open Html in
    select
      [
        onChange (fun x ->
            if m then ChangeMonth (n, int_of_string x)
            else ChangeDate (n, int_of_string x));
      ]
      (List.init
         (if m then 12 else 31)
         (fun x ->
           option'
             [
               string_of_int (x + 1) |> value;
               Attributes.selected
                 ( if m then model.(n).month = x + 1
                 else model.(n).date = x + 1 );
             ]
             [ x + 1 |> string_of_int |> text ]))

  (**[party_rows model] returns the list of table rows to be displayed. *)
  let party_rows model =
    let open Html2 in
    List.init num_dates (fun x ->
        tr
          [ Attributes.id "table-row" ]
          ( [
              td
                [ Attributes.classList [ ("emoji-box", true) ] ]
                [
                  ( if model.(x).correct then emoji_of_row x
                  else {js|❌|js} )
                  |> text;
                ];
              td []
                [
                  selector model x true;
                  text "-";
                  selector model x false;
                  text "-2021";
                ];
              td []
                [
                  audio
                    [
                      Attributes.controls true;
                      Attributes.src
                        ( "records_audio/song-"
                        ^ string_of_int (x + 1)
                        ^ ".ogg" );
                    ]
                    [];
                ];
            ]
          @ [ image_list x ] ))

  (**[all_correct_check model] returns true if all of the dropdowns are
     set correctly after a [Check], and false otherwise.*)
  let all_correct_check model =
    Array.fold_left (fun b drop -> drop.correct && b) true model

  (** [view model] returns a Vdom object that contains the HTML
      representing this crossword puzzle [model] object *)

  let view model =
    let open Html in
    div []
      [
        div []
          [
            i []
              [
                "A flyer with tour dates from earlier this year. Fun \
                 fact: this artist loves to celebrate and party with \
                 friends, especially when it's their special day!"
                |> text;
              ];
          ];
        div
          [ classList [ ("party-wrapper", true) ] ]
          [
            button
              [ onClick Check; classList [ ("button-box", true) ] ]
              [
                ( if all_correct_check model then {js|💎|js}
                else {js|🎉|js} )
                |> text;
              ];
          ];
        h3
          [ classList [ ("title-wrapper", true) ] ]
          [ "2021 K. K. Holiday Tour!" |> text ];
        div []
          [
            table
              [ classList [ ("center-margin", true) ] ]
              (party_rows model);
          ];
      ]
end
