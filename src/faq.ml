open Tea

type msg

let view () =
  let open Html in
  div []
    [
      h2 [] [ Printf.sprintf "FAQ" |> text ];
      p []
        [
          text
            "Hello there, we are The Rats! We have been solving puzzle hunts \
             for about a year now, and we wanted to give creating our own \
             puzzles a try! ";
        ];
    ]
