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
              "(* TODO: Help this project group puzzle out their bugs \
               in time for their demo! *)" |> text;
            ];
          p
            [ classList [ ("home-text", true) ] ]
            [
              i []
                [
                  "(You'll need to log in first before you can make \
                   progress!)" |> text;
                ];
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
            [ img [ src "west_campus.png" ] [] ];
        ];
    ]
