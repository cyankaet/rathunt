open Tea

module M : Puzzle.S = struct
  type t = unit

  type model = t

  type msg = unit

  let init () = ((), Cmd.none)

  let update model msg = ((), Cmd.none)

  let view model =
    let open Html in
    div []
      [
        p []
          [
            Printf.sprintf
              "There's ultimately nothing suspicious about a few new transfer \
               students being murdered, right? Okay, they were a little \
               talented."
            |> text;
          ];
        p [] [];
        p []
          [
            Printf.sprintf
              "Oh hi [TEAM NAME], you're in charge of investigating the crime \
               scenes and identifying any information about our killer. We'll \
               take it from here."
            |> text;
          ];
      ]
end
