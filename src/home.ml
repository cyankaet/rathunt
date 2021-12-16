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
        [ classList [ ("home-text", true) ] ]
        [
          p []
            [
              "You, Ryan Son, and Clark Michaels are CS 3110 students \
               working on your final project together into the wee \
               hours of the night. You are attempting to build an \
               ambitious simulation of West Campus, but along the way \
               it seems as if you have hit every single roadblock \
               possible. In the early morning of December 16th, your \
               test cases are failing, some of your code is hanging, \
               and everything seems to be falling apart, until you \
               discover this mess in your code: " |> text;
            ];
          img [ src "intro_cipher.png" ] [];
          p []
            [
              "What should you do to start cleaning up the mess?"
              |> text;
            ];
          p []
            [
              "After _ _ _ _ _ _  _ _ _ _  _ _ _  _ _ _ _ _  _ _ _ _ _ \
               _ _ _, you and your project group find yourselves \
               transported into simulation itself to fix the bugs. \
               Walking around your virtual construction of West \
               Campus, you observe that something big seems to be \
               amiss with each of the five main houses." |> text;
            ];
        ];
    ]
