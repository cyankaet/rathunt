open Tea

type msg

let view () =
  let open Html in
  div [ classList [] ]
    [
      img ?unique:(Some "frend") [ classList [ ("rat-img", true) ] ] [];
      div [ classList [] ] [ h2 [] [ Printf.sprintf "About" |> text ] ];
    ]
