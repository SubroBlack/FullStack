import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  //Handler when Good is clicked
  const good = () => {
    store.dispatch({
      type: "GOOD"
    });
  };

  // Handler when Ok is clicked
  const ok = () => {
    store.dispatch({
      type: "OK"
    });
  };

  // Handler when Bad is clicked
  const bad = () => {
    store.dispatch({
      type: "BAD"
    });
  };

  // Handler when Zero is clicked
  const zero = () => {
    store.dispatch({
      type: "ZERO"
    });
  };

  return (
    <div>
      <button onClick={good}>Good</button>
      <button onClick={ok}>Neutral</button>
      <button onClick={bad}>Bad</button>
      <button onClick={zero}>Zero</button>
      <div>Good {store.getState().good}</div>
      <div>Neutral {store.getState().ok}</div>
      <div>Bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
