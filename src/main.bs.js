

import * as Tea_app from "bucklescript-tea/src-ocaml/tea_app.bs.js";
import * as Tea_html from "bucklescript-tea/src-ocaml/tea_html.bs.js";

function set(param_0) {
  return /* Set */{
          _0: param_0
        };
}

function init(param) {
  return 4;
}

function update(model, v) {
  if (typeof v !== "number") {
    return v._0;
  }
  switch (v) {
    case /* Increment */0 :
        return model + 1 | 0;
    case /* Decrement */1 :
        return model - 1 | 0;
    case /* Reset */2 :
        return 0;
    
  }
}

function view_button(title, msg) {
  return Tea_html.button(undefined, undefined, {
              hd: Tea_html.onClick(msg),
              tl: /* [] */0
            }, {
              hd: Tea_html.text(title),
              tl: /* [] */0
            });
}

function view(model) {
  return Tea_html.div(undefined, undefined, /* [] */0, {
              hd: Tea_html.span(undefined, undefined, {
                    hd: Tea_html.style("text-weight", "bold"),
                    tl: /* [] */0
                  }, {
                    hd: Tea_html.text(String(model)),
                    tl: /* [] */0
                  }),
              tl: {
                hd: Tea_html.br(/* [] */0),
                tl: {
                  hd: view_button("Increment", /* Increment */0),
                  tl: {
                    hd: Tea_html.br(/* [] */0),
                    tl: {
                      hd: view_button("Decrement", /* Decrement */1),
                      tl: {
                        hd: Tea_html.br(/* [] */0),
                        tl: {
                          hd: view_button("Set to 42", /* Set */{
                                _0: 42
                              }),
                          tl: {
                            hd: Tea_html.br(/* [] */0),
                            tl: {
                              hd: model !== 0 ? view_button("Reset", /* Reset */2) : Tea_html.noNode,
                              tl: /* [] */0
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            });
}

var partial_arg = {
  model: 4,
  update: update,
  view: view
};

function main(param, param$1) {
  return Tea_app.beginnerProgram(partial_arg, param, param$1);
}

var increment = /* Increment */0;

var decrement = /* Decrement */1;

var reset = /* Reset */2;

export {
  increment ,
  decrement ,
  reset ,
  set ,
  init ,
  update ,
  view_button ,
  view ,
  main ,
  
}
/* Tea_html Not a pure module */
