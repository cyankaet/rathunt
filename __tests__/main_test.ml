open Jest
open Tea
module Crossword2 = Puzzlepage.M (Crossword.M) 
module Crossword = Crossword.M

type test_record = { value : string }

let () =
  describe "Expect" (fun() ->
    let open Expect in
    test "BSJest working" (fun () ->
      expect (9/3) |> toBe 3))

open Crossword
let sample_cw  = fst (init ())
type msg' = msg
let invalid_cs = ChangeSquare {text="whatever"; pos = (10 ,10)} 

let () = describe "Expect" (fun () ->
  let open Expect in
  test "UpdateInvalidSquare" (fun () ->
    expect (Crossword.update sample_cw invalid_cs) 
    |> toEqual (sample_cw, Cmd.none) ))

let result_cw = sample_cw

let () = result_cw.squares.(1).(1) <-
{
  (result_cw.squares.(1).(1)) with
  text="Au";
  is_element = true;
}
let element_cs = ChangeSquare {text="Au"; pos=(1,1)}

let () = describe "Expect" (fun () ->
  let open Expect in
  test "UpdateElement" (fun () ->
    expect (Crossword.update sample_cw element_cs) 
    |> toEqual (result_cw, Cmd.none) ))


let () = result_cw.squares.(1).(1) <-
{
  (result_cw.squares.(1).(1)) with
  text="Og";
  is_element=false;
}
let noelem_cs = ChangeSquare {text="Au"; pos=(1,1)}

let () = describe "Expect" (fun () ->
  let open Expect in
  test "UpdateNoElement" (fun () ->
    expect (Crossword.update sample_cw noelem_cs)
    |> toEqual (result_cw, Cmd.none)))
  
let () =
  describe "Expect" (fun () ->
      let open Expect in
      test "toBe" (fun () ->
          expect (Crossword2.string_clean "answ3r")
          |> toBe Js.String.("ANSWR")))


