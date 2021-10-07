let component = ReasonReact.statelessComponent "Greeting"

let make _children = {
  component with
  render =
    (fun _self ->
       ReactDOMRe.createElement "p" [| ReasonReact.string "Hello" |])
}

let () = ReactDOMRe.renderToElementWithId (ReasonReact.element (make [||])) "root"