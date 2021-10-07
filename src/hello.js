'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/legacy/ReactDOMRe.bs.js");
var ReasonReact = require("reason-react/src/legacy/ReasonReact.bs.js");

var component = ReasonReact.statelessComponent("Greeting");

function make(_children) {
  return {
    debugName: component.debugName,
    reactClassInternal: component.reactClassInternal,
    handedOffState: component.handedOffState,
    willReceiveProps: component.willReceiveProps,
    didMount: component.didMount,
    didUpdate: component.didUpdate,
    willUnmount: component.willUnmount,
    willUpdate: component.willUpdate,
    shouldUpdate: component.shouldUpdate,
    render: (function (_self) {
      return React.createElement("p", undefined, "Hello");
    }),
    initialState: component.initialState,
    retainedProps: component.retainedProps,
    reducer: component.reducer,
    jsElementWrapped: component.jsElementWrapped
  };
}

ReactDOMRe.renderToElementWithId(ReasonReact.element(undefined, undefined, make([])), "root");

exports.component = component;
exports.make = make;
/* component Not a pure module */
