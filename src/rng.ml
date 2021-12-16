let seed = Random.init

let generate = Random.int

let shuffle lst =
  let rand_nums = List.map (fun elt -> (Random.bits (), elt)) lst in
  let permute = List.sort compare rand_nums in
  List.map snd permute

let uniform = Random.float
