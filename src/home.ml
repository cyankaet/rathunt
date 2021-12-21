open Tea

type msg

let view () =
  let open Html in
  div
    [ classList [ ("center-align", true); ("home-div", true) ] ]
    [
      h2
        [ classList [ ("italics", true) ] ]
        [
          "Help your fellow CS 3110 students complete their final \
           project!" |> text;
        ];
      div
        [ classList [ ("home-div", true) ] ]
        [
          p
            [ classList [ ("home-text", true) ] ]
            [
              "TODO: Help this project group work out their bugs in \
               time for their demo! " |> text;
            ];
        ];
    ]
