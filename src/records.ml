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

  (**[image_list n] returns the list of img classes that are to be
     displayed in row [n].*)
  let image_list n =
    let open Html in
    List.init (List.nth guest_nums n) (fun x ->
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
          [])

  (**[party_rows model] returns the list of table rows to be displayed. *)
  let party_rows model =
    let open Html2 in
    List.init num_dates (fun x ->
        tr []
          ( [
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
          @ image_list x ))

  (** [view model] returns a Vdom object that contains the HTML
      representing this crossword puzzle [model] object *)
  let view model =
    let open Html in
    div []
      [
        table
          [ classList [ ("center-margin", true) ] ]
          (party_rows model);
      ]
end
