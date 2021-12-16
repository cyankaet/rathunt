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
              "You and your team are CS 3110 students working on your \
               final project together into the wee hours of the night. \
               You are attempting to build an ambitious 3D-simulation \
               of West Campus using graphics libraries, but along the \
               way it seems as if you have hit every single roadblock \
               possible. In the early morning of December 16th, your \
               test cases are failing, your code is broken, and things \
               seem to be one false step away from falling apart, \
               until you stumble upon this mess in your code: " |> text;
            ];
          img [ src "intro_cipher.png" ] [];
          p []
            [
              "What should you do to start cleaning up the mess?"
              |> text;
            ];
          p []
            [
              "DIVING INTO THE ERROR MESSAGES, you and your project \
               group find yourselves transported into the simulation \
               itself to resolve the errors head-on. As your group \
               splits up to explore your virtual construction of West \
               Campus, you see something seems to be amiss with each \
               of the five main houses on West. In particular, the \
               bugs you see in your code seem to manifest in the \
               simulation as puzzles..." |> text;
            ];
          p []
            [
              "Having solved most of the puzzles to patched a lot of \
               the critical bugs you can see, you begin to realize \
               that these bugs are merely a symptom of something \
               deeper wrong with your program. They all seem connected \
               to the core of your program, which you had stored deep \
               within Noyes Community Center. You rush to the edges of \
               your simulation to square away the root of your \
               problems once and for all...  " |> text;
            ];
          p []
            [
              "You know what you must do. Channeling your power as an \
               OCAML TAMER, you reach into the OCaml code underlying \
               your program, and pull three little mischevious OCamels \
               out of the code... " |> text;
            ];
          p []
            [
              "... and you wake up at your table the next morning, all \
               of you having fallen asleep at the table, with three \
               little miniature camels. You run [make test], and \
               voila! The code seems to be functioning perfectly! All \
               that's left now is to finish your writeup...  " |> text;
              "Congratulations on completing RatHunt!" |> text;
            ];
        ];
    ]
