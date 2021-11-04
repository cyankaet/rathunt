open Jest
module Crossword = Puzzlepage.M (Crossword.M)

type test_record = { value : string }

let () =
  describe "Expect" (fun () ->
      let open Expect in
      test "toBe" (fun () ->
          expect (Crossword.string_clean "answ3r")
          |> toBe Js.String.("ANSWR")))
