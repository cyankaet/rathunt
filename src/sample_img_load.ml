open Tea

type msg

let view () =
  let open Html in
  div
    [ classList [ ("about-container", true) ] ]
    [
      div
        [ classList [ ("about-background", true) ] ]
        [
          img
            [
              src
                "https://raw.githubusercontent.com/cyankaet/rathunt/dev/resources/rats.jpeg";
              classList [ ("rat-img", true) ];
            ]
            [];
        ];
      div
        [ classList [ ("about-foreground", true) ] ]
        [ h2 [] [ Printf.sprintf "About" |> text ] ];
    ]
