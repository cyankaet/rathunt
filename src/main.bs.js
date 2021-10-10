

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Printf from "bs-platform/lib/es6/printf.js";
import * as Tea_app from "bucklescript-tea/src-ocaml/tea_app.bs.js";
import * as Tea_html from "bucklescript-tea/src-ocaml/tea_html.bs.js";

var model = {
  moves: 1,
  turn: /* White */1
};

function update(model, param) {
  var match = model.turn;
  var turn = match ? /* Black */0 : /* White */1;
  var moves = model.moves + 1 | 0;
  return {
          moves: moves,
          turn: turn
        };
}

function view(model) {
  var match = model.turn;
  return Tea_html.div(undefined, undefined, /* [] */0, {
              hd: Tea_html.p(undefined, undefined, /* [] */0, {
                    hd: Tea_html.text(Curry._2(Printf.sprintf(/* Format */{
                                  _0: {
                                    TAG: /* String_literal */11,
                                    _0: "Move ",
                                    _1: {
                                      TAG: /* Int */4,
                                      _0: /* Int_d */0,
                                      _1: /* No_padding */0,
                                      _2: /* No_precision */0,
                                      _3: {
                                        TAG: /* String_literal */11,
                                        _0: ".  It is ",
                                        _1: {
                                          TAG: /* String */2,
                                          _0: /* No_padding */0,
                                          _1: {
                                            TAG: /* String_literal */11,
                                            _0: "'s move.",
                                            _1: /* End_of_format */0
                                          }
                                        }
                                      }
                                    }
                                  },
                                  _1: "Move %d.  It is %s's move."
                                }), model.moves, match ? "White" : "Black")),
                    tl: /* [] */0
                  }),
              tl: {
                hd: Tea_html.p(undefined, undefined, /* [] */0, {
                      hd: Tea_html.button(undefined, undefined, {
                            hd: Tea_html.onClick(/* Move */0),
                            tl: /* [] */0
                          }, {
                            hd: Tea_html.text("Make a move!"),
                            tl: /* [] */0
                          }),
                      tl: /* [] */0
                    }),
                tl: /* [] */0
              }
            });
}

var partial_arg = {
  model: model,
  update: update,
  view: view
};

function main(param, param$1) {
  return Tea_app.beginnerProgram(partial_arg, param, param$1);
}

export {
  model ,
  update ,
  view ,
  main ,
  
}
/* Tea_html Not a pure module */
