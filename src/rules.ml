open Tea

type msg

let view () =
  let open Html in
  div []
    [
      p
        [ classList [ ("clues", true) ] ]
        [
          text
            "We don't ask for much, but there are a few things we \
             request of you to make sure this is an enjoyable \
             experience for everyone.";
        ];
      ul
        [ classList [ ("clues", true) ] ]
        [
          li [] [ h3 [] [ text "Format" ] ];
          ul []
            [
              li []
                [
                  text
                    "This hunt is meant to be done at your own pace. \
                     This is meant for teams of 5-6 people.";
                ];
              li []
                [
                  text
                    "All of the non-meta puzzles will be unlocked at \
                     the start, and solving all the non-meta puzzles \
                     will unlock the meta puzzle.";
                ];
              li []
                [
                  text
                    "There are no hints on these puzzles. These should \
                     be relatively doable for a team to solve.";
                ];
              li []
                [
                  text
                    "Answers will be uploaded to the site at a time to \
                     be determined.";
                ];
            ];
          li [] [ h3 [] [ text "Solving" ] ];
          ul []
            [
              li []
                [
                  text
                    "Every string is a string of alphabetical \
                     characters. We will clean your answer upon \
                     submission where we will capitalize all lowercase \
                     characters and removing anything else from the \
                     guess phrase.";
                ];
              li []
                [
                  text
                    "There is no guess limit for this hunt, but we do \
                     desire that you keep your answer requests to a \
                     reasonable level in order to not overload our \
                     database.";
                ];
            ];
          li [] [ h3 [] [ text "Other" ] ];
          ul []
            [
              li []
                [
                  text
                    "You are allowed to reference outside resources, \
                     including the internet and anyone who is not in \
                     another team.";
                ];
              li []
                [
                  text
                    "It will not be necessary to look at the source \
                     code for these puzzles, but you are welcome to \
                     inspect.";
                ];
              li []
                [ text "We have the right to change any of the rules." ];
            ];
        ];
    ]
