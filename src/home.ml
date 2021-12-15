open Tea

type msg

let view () =
  let open Html in
  div [] [ h2 [] [ "home" |> text ] ]
