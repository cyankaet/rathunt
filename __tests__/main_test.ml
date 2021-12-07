open Jest
module Crossword = Puzzlepage.M (Crossword.M)
module Treeoverflow = Treeoverflow.M

let () =
  describe "Expect" (fun () ->
      let open Expect in
      test "toBe" (fun () ->
          expect (Crossword.string_clean "answ3r")
          |> toBe Js.String.("ANSWR")))

let () =
  describe "Expect" (fun () ->
      let open Expect in
      test "toBe" (fun () ->
          expect (Treeoverflow.init () |> fst).value
          |> toBe Js.String.("bastion")))
