import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import { browserHistory, IndexRoute } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { App, Home, Login, Register } from "./containers";
// import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));

// const title = "Memo_App!";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        {/* <IndexRoute component={Home} /> */}
        {/* <Route path="/home" component={Home} /> */}
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
    {/* <div>{title}</div> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
