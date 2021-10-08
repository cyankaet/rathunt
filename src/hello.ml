[@@@bs.config {jsx = 3}]
module Counter =
  struct
    let make ~name  =
      let (count,setCount) = React.useState (fun ()  -> 0) in
      ((div
          ~children:[((p
                         ~children:[React.string
                                      (name ^
                                         (((" clicked ")[@reason.raw_literal
                                                          " clicked "])
                                            ^
                                            ((string_of_int count) ^
                                               ((" times")[@reason.raw_literal
                                                            " times"]))))] ())
                    [@JSX ]);
                    ((button
                        ~onClick:(fun _  -> setCount (fun _  -> count + 1))
                        ~children:[React.string
                                     (("Click me")[@reason.raw_literal
                                                    "Click me"])] ())
                    [@JSX ])] ())[@JSX ])[@@react.component ]
  end
let _ =
  ReactDOMRe.renderToElementWithId
    ((Counter.createElement
        ~name:(("Counter")[@reason.raw_literal "Counter"]) ~children:[] ())
    [@JSX ]) (("preview")[@reason.raw_literal "preview"])