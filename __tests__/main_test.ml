(* open Jest open Tea

   type test_record = { value : string }

   module Crossword = Puzzlepage.M (Crossword.M) module Treeoverflow =
   Treeoverflow.M

   (* Crossword tests start here *) let () = describe "Expect" (fun ()
   -> let open Expect in test "BSJest working" (fun () -> expect (9 / 3)
   |> toBe 3))

   open Crossword

   let sample_cw = fst (init ())

   type msg' = msg

   let invalid_cs = ChangeSquare { text = "whatever"; pos = (10, 10) }

   let () = describe "Expect" (fun () -> let open Expect in test
   "UpdateInvalidSquare" (fun () -> expect (Crossword.update sample_cw
   invalid_cs) |> toEqual (sample_cw, Cmd.none)))

   let result_cw = sample_cw

   let () = result_cw.squares.(1).(1) <- { (result_cw.squares.(1).(1))
   with text = "Au"; is_element = true }

   let element_cs = ChangeSquare { text = "Au"; pos = (1, 1) }

   let () = describe "Expect" (fun () -> let open Expect in test
   "UpdateElement" (fun () -> expect (Crossword.update sample_cw
   element_cs) |> toEqual (result_cw, Cmd.none)))

   let () = result_cw.squares.(1).(1) <- { (result_cw.squares.(1).(1))
   with text = "Og"; is_element = false }

   let noelem_cs = ChangeSquare { text = "Au"; pos = (1, 1) }

   let () = describe "Expect" (fun () -> let open Expect in test
   "UpdateNoElement" (fun () -> expect (Crossword.update sample_cw
   noelem_cs) |> toEqual (result_cw, Cmd.none)))

   (* Puzzlepage tests start here *)

   module PageCross = Puzzlepage.M (Crossword) open PageCross

   let () = describe "Expect" (fun () -> let open Expect in test
   "stringclean" (fun () -> expect (PageCross.string_clean "answ3r") |>
   toBe Js.String.("ANSWR")))

   let sample_pagecross = fst (PageCross.init "Boog")

   let t1 = submit_guess sample_pagecross "bug"

   let () = describe "Expect" (fun () -> let open Expect in test
   "badanswer" (fun () -> expect t1.correct |> toBe false))

   let t2 = submit_guess sample_pagecross "2132BOO34543G#$"

   let () = describe "Expect" (fun () -> let open Expect in test
   "goodanswer" (fun () -> expect t2.correct |> toBe true))

   let boxtextobject = UpdateText "B324ug"

   let () = describe "Expect" (fun () -> let open Expect in test "Change
   Box Text" (fun () -> expect (fst (update sample_pagecross
   boxtextobject)).box_text |> toBe "B324ug"))

   let submitobject = Submit

   let () = describe "Expect" (fun () -> let open Expect in test "Submit
   bad answer" (fun () -> expect (fst (update (fst (update
   sample_pagecross boxtextobject)) submitobject)) .box_text |> toBe
   sample_pagecross.box_text))

   let comparatorpuzzleint = fst (Crossword.init ())

   let () = comparatorpuzzleint.squares.(1).(1) <- {
   (result_cw.squares.(1).(1)) with text = "Au"; is_element = true }

   let comparatorpuzzle = { sample_pagecross with puzzle =
   comparatorpuzzleint }

   let puzzleobject = Puzzle_msg (ChangeSquare { text = "Au"; pos = (1,
   1) })

   let () = describe "Expect" (fun () -> let open Expect in test
   "Internal Update" (fun () -> expect (fst (update sample_pagecross
   puzzleobject)) |> toEqual comparatorpuzzle))

   (* Meta tests start here *) module Meta = Meta.M

   let sample_list = [ 1; 5; 6; 0; 3; 4; 7 ]

   let () = describe "Expect" (fun () -> let open Expect in test
   "Get_first" (fun () -> expect (get_first_k sample_list 3) |> toEqual
   [ 1; 5; 6 ]))

   let () = describe "Expect" (fun () -> let open Expect in test
   "Get_first empty" (fun () -> expect (get_first_k [] 3837493286) |>
   toEqual []))

   let () = describe "Expect" (fun () -> let open Expect in test
   "Remove_first empty" (fun () -> expect (remove_first_k [] 3837493286)
   |> toEqual []))

   let () = describe "Expect" (fun () -> let open Expect in test
   "Remove_first" (fun () -> expect (remove_first_k sample_list 4) |>
   toEqual [ 3; 4; 7 ]))

   let sample_meta = fst (init ())

   let meta_results = { (List.hd sample_meta) with toggled = true }

   let firsttext = Toggle "Have you ever lost your own name before?"

   let () = describe "Expect" (fun () -> let open Expect in test
   "Remove_first" (fun () -> expect (List.hd (fst (Meta.update
   sample_meta firsttext))) |> toEqual meta_results))

   (* let () = describe "Expect" (fun () -> let open Expect in test
   "toBe" (fun () -> expect ( match Treeoverflow.init () |> fst with |
   Treeoverflow.Node (_, d, _) -> d.value ) |> toBe
   Js.String.("bastion"))) *) *)
