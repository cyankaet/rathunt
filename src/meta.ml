open Tea 

module T : Puzzle.S = struct
  type button = {
    label : string;
    toggled : bool;
  }

  type t = (string * button) list

  type model = t

  type msg =
    | Toggle of string
        (** All of the possile webpage signals to handle *)

  
(** the height of the grid of buttons *)
  let m = 3

(** the width of the grid of buttons *)
  let n = 3
(** the list of questions on each button in the meta, reading
      left-right up-down *)
  let questions = [ "a"; "b"; "c"; "d"; "e"; "f"; "g"; "h"; "i" ]

  let new_button s = (s, { label = s; toggled = false })

  let init () = (List.map new_button questions, Cmd.none)

  (** [update model msg] returns the puzzle model updated according to
      the accompanying message, along with a command to be executed *)
  let update t = function
    (* this can be done more defensively *)
    | Toggle q -> let b = List.assoc q t in ((q, {b with toggled = not b.toggled}) :: List.remove_assoc q t, Cmd.none)


    (** [get_first_n lst k] returns up to the first k elements of lst, if they exist. *)
    let rec get_first_k lst k = 
    if k = 0 then [] else match lst with 
    | [] -> []
    | h :: t -> h :: get_first_k t (k-1)

    (** [button_elt_of_button key] takes a key which is a tuple of a string s with some other information, and generates a button
    with s as the label. *)
    let button_elt_of_button key = 
      let open Html in td [ classList [ ("grid", true); ("selected", (snd key).toggled) ] ]
    [ button [ onClick (Toggle (fst key))] [ text (fst key) ] ] 

    (** [show_row button_list] generates the HTML for the row of n buttons 
    created from the first n elements of button_list. Requires: button_list contains at least n elements. *)
    let show_row lst = List.map button_elt_of_button (get_first_k lst n)

    (** [remove_first_k lst k] removes the first k elements from a list, if they exist.*)
    let rec remove_first_k lst k = 
      if k = 0 then lst else match lst with 
      | [] -> [] 
      | _ :: t -> remove_first_k t (k-1)

    (** [show_buttons_help lst r] recursively returns the r rows of buttons given by the list of buttons lst. 
    Requires that lst have exactly n * r buttons. *)
    let rec show_buttons_help lst r = 
    let open Html in 
    match lst with 
    | [] -> [] 
    | _ :: _ -> (tr [] (show_row lst)) :: show_buttons_help (remove_first_k lst n) (r - 1)

    (** [show_buttons lst] generates the HTML code needed to display the button list in an m x n grid, where m and n are as defined
within the module. Requires: button_list contains m * n elements.  *)
    let show_buttons lst = let open Html in 
    table [ classList [ ("center-margin", true) ] ] (show_buttons_help lst m)
    
  (** [view model] returns a Vdom object that contains the html
      representing this puzzle [model] object *)
  let view = show_buttons 


end