open Tea

type msg

let view () =
  let open Html in
  div [ classList [] ]
    [
      div
        [ id "about-container"; classList [ ("center-margin", true) ] ]
        [
          div
            [ classList [ ("about-image-container", true) ] ]
            [ img [ src "rats.jpeg" ] [] ];
        ];
      div []
        [
          p
            [ classList [ ("about", true) ] ]
            [
              text
                "Hello there, we are The Rats! We have been solving \
                 puzzle hunts for about a year now, and we wanted to \
                 give creating our own puzzles a try! We are a group \
                 of four sophomores at Cornell who also like to \
                 program, so we decided to make this as our final \
                 project! We hope you enjoy the hunt!";
            ];
        ];
    ]
