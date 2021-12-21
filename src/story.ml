open Tea

type t = {
  mutable logged_in : bool;
  mutable solves : int;
  mutable meta_solved : bool;
  unlocked : bool;
}

type model = t

type msg = Unlock

let init () =
  ( {
      logged_in = false;
      solves = 0;
      meta_solved = false;
      unlocked = false;
    },
    Cmd.none )

let update model = function
  | Unlock ->
      print_endline "unlocked";
      ({ model with unlocked = true }, Cmd.none)

let view model =
  let open Html in
  if model.logged_in then
    div
      [ classList [ ("center-align", true); ("home-div", true) ] ]
      ( [
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
                  "You and your team are CS 3110 students working on \
                   your final project together into the wee hours of \
                   the night. You are attempting to build an ambitious \
                   3D-simulation of West Campus using graphics \
                   libraries, but along the way it seems as if you \
                   have hit every single roadblock possible. In the \
                   early morning of December 16th, your test cases are \
                   failing, your code is broken, and things seem to be \
                   one false step away from falling apart, until you \
                   stumble upon this button in your code: " |> text;
                ];
              (* img [ src "intro_cipher.png" ] []; p [] [ "What should
                 you do to start cleaning up the mess?" |> text; ]; *)
            ];
        ]
      @
      if not model.unlocked then
        [
          button
            [ onClick Unlock; classList [ ("story", true) ] ]
            [ text "ACTIVATE HANDS-ON DEBUGGING" ];
        ]
      else
        [
          div
            [ classList [ ("home-text", true) ] ]
            [
              p []
                [
                  "You and your project are sucked into your \
                   computers, transported into the simulation itself \
                   to resolve the errors head-on. As your group splits \
                   up to explore your virtual construction of West \
                   Campus, you see something seems to be amiss with \
                   each of the five main houses on West. In \
                   particular, the bugs you see in your code seem to \
                   manifest in the simulation as puzzles..." |> text;
                ];
            ];
        ]
        @
        if model.solves >= 3 then
          [
            div
              [ classList [ ("home-text", true) ] ]
              [
                p []
                  [
                    "Having solved most of the puzzles to patched a \
                     lot of the critical bugs you can see, you begin \
                     to realize that these bugs are merely a symptom \
                     of something deeper wrong with your program. They \
                     all seem connected to the core of your program, \
                     which you had stored deep within Noyes Community \
                     Center. You rush to the edges of your simulation \
                     to square away the root of your problems once and \
                     for all...  " |> text;
                  ];
              ];
          ]
          @
          if model.meta_solved then
            [
              div
                [ classList [ ("home-text", true) ] ]
                [
                  p []
                    [
                      "You know what you must do. Channeling your \
                       power as an OCAML TAMER, you reach into the \
                       OCaml code underlying your program, and pull \
                       three little mischevious OCamels out of the \
                       code... " |> text;
                    ];
                  p []
                    [
                      "... and you wake up at your table the next \
                       morning, all of you having fallen asleep at the \
                       table, with three little miniature camels. You \
                       run [make test], and voila! The code seems to \
                       be functioning perfectly! All that's left now \
                       is to finish your writeup...  " |> text;
                      "Congratulations on completing RatHunt!" |> text;
                    ];
                ];
            ]
          else []
        else [] )
  else
    div
      [ classList [ ("home-div", true) ] ]
      [
        p
          [ classList [ ("home-text", true) ] ]
          [
            "Please log in to see the story and your team's progress! "
            |> text;
          ];
      ]
