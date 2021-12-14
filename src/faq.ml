open Tea

type msg

let view () =
  let open Html in
  div []
    [
      h2 [] [ Printf.sprintf "FAQs" |> text ];
      ul
        [ classList [ ("clues", true) ] ]
        [
          li []
            [
              h3 []
                [ text "What is a puzzlehunt? How do I solve these puzzles?" ];
            ];
          ul []
            [
              li []
                [
                  div []
                    [
                      p []
                        [
                          text
                            "A puzzlehunt is a collection of puzzles. In a \
                             puzzle, you're given information, whether it be \
                             images, text, grids, or other information. You \
                             then have to use this information to extract some \
                             type of answer. No two puzzles are the same, and \
                             a key part of the puzzle is figuring out what the \
                             puzzle wants you to do.";
                        ];
                      p []
                        [
                          text
                            "If you want to see other (better) examples of \
                             puzzlehunts, feel free to check out the following \
                             ones below:";
                        ];
                      ul []
                        [
                          li []
                            [
                              a
                                [
                                  href "https://galacticpuzzlehunt.com/archive";
                                  target "_blank";
                                ]
                                [ text "Galactic Puzzle Hunt (GPH)" ];
                            ];
                          li []
                            [
                              a
                                [
                                  href "https://teammatehunt.com/";
                                  target "_blank";
                                ]
                                [ text "Teammate Hunt" ];
                            ];
                          li []
                            [
                              a
                                [
                                  href "https://www.huntinality.com/";
                                  target "_blank";
                                ]
                                [ text "Huntinality" ];
                            ];
                          li []
                            [
                              a
                                [
                                  href "https://puzzlehunt.club.cc.cmu.edu/";
                                  target "_blank";
                                ]
                                [ text "Puzzlehunt CMU" ];
                            ];
                          li []
                            [
                              a
                                [
                                  href "https://silphpuzzlehunt.com/";
                                  target "_blank";
                                ]
                                [ text "Silph Puzzle Hunt" ];
                            ];
                          li []
                            [
                              a
                                [
                                  href
                                    "https://www.mit.edu/~puzzle/huntsbyyear.html";
                                  target "_blank";
                                ]
                                [
                                  text
                                    "MIT Mystery Hunt (MITMH) (the biggest \
                                     puzzle hunt of the year)";
                                ];
                            ];
                        ];
                    ];
                ];
            ];
          li [] [ h3 [] [ text "How long and difficult is this hunt?" ] ];
          ul []
            [
              li []
                [
                  text
                    "This is a mini-round with 5 feeder puzzles and 1 \
                     meta-puzzle, which is a puzzle which uses the answers of \
                     the previous puzzles. We anticipate this puzzle to be in \
                     the middle-range of puzzles found in GPH and Teammate \
                     Hunt.";
                ];
            ];
          li [] [ h3 [] [ text "Who is running this hunt?" ] ];
          ul []
            [
              li []
                [
                  text
                    "We are a group of 4 students really interested in puzzles \
                     and we chose to make a mini-puzzle hunt! Learn more about \
                     us in the about section!";
                ];
            ];
          li []
            [
              h3 []
                [
                  text
                    "Can I make a bot that interfaces with the \
                     website/database?";
                ];
            ];
          ul []
            [
              li []
                [
                  text
                    ( "There will be no need to, but we won't stop you. Just \
                       please don't send too many requests! " ^ {js|🥺|js} );
                ];
            ];
          li [] [ h3 [] [ text "Help! I'm stuck on a puzzle! AAAAAAAAAAAA" ] ];
          ul []
            [
              li [] [ text "Here are some tips that we recommend:" ];
              ul []
                [
                  li []
                    [
                      text
                        "Double check your work, sometimes a small error is \
                         just what's stopping you from continuing in the \
                         problem.";
                    ];
                  li []
                    [
                      text
                        "Get a different perspective, either from taking a \
                         break or by having someone else look at the puzzles.";
                    ];
                  li []
                    [
                      text
                        "Consider what you know, what you don't know, and how \
                         you could use what you know in order to get something \
                         new.";
                    ];
                  li []
                    [
                      a
                        [ href "https://google.com"; target "_blank" ]
                        [ text "Google" ];
                      text " is your best friend!";
                    ];
                  li []
                    [
                      a
                        [
                          href
                            "https://www.mit.edu/~puzzle/resources/haveyoutried.pdf";
                          target "_blank";
                        ]
                        [ text "Have you tried..." ];
                    ];
                ];
            ];
          li [] [ h3 [] [ text "Are there prizes?" ] ];
          ul [] [ li [] [ text "No." ] ];
          li [] [ h3 [] [ text "Is there an in-person component?" ] ];
          ul [] [ li [] [ text "No." ] ];
          li [] [ h3 [] [ text "Is there a registration deadline?" ] ];
          ul [] [ li [] [ text "No." ] ];
          li [] [ h3 [] [ text "Is this a puzzle?" ] ];
          ul [] [ li [] [ text ("This is NOT a puzzle. " ^ {js|🤔|js}) ] ];
          li []
            [
              h3 [] [ text "Wait a minute, Rat Hunt? That sounds familiar..." ];
            ];
          ul []
            [
              li []
                [
                  text
                    ( "We are not affiliated with Palindrome or MITMH 2022 in \
                       any way, shape, state, or form. " ^ {js|😳|js}
                    ^ " However, we will be solving MITMH 2022 though! We are \
                       just four university students who call ourselves \"The \
                       Rats.\"" );
                ];
            ];
        ];
    ]
