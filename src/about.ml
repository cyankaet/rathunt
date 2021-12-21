open Tea

type msg

let view () =
  let open Html in
  div
    [ classList [ ("home-div", true) ] ]
    [
      div []
        [
          p
            [ classList [ ("home-text", true) ] ]
            [
              text
                "Hello there, we are The Rats! We have been solving \
                 puzzle hunts for about a year now, and we wanted to \
                 give creating our own puzzles a try! We are a group \
                 of four sophomores at Cornell who also like to \
                 program, so we decided to make this as our final \
                 project for CS 3110! We hope you enjoy the hunt!";
            ];
        ];
      div
        [ id "about-container" ]
        [
          div
            [
              classList
                [
                  ("about-image-container", true);
                  ("center-margin", true);
                ];
            ]
            [ img [ src "rats.jpeg" ] [] ];
        ];
    ]
