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
        <Route exact path="/" component={Home} />
        {/* exact 속성을 추가하게 되면 정확한 path 경로에만 적용되는 라우트 라는 뜻입니다.
          따라서 이 라우트는 '/' 경로에서만 작동하는 라우트가 됩니다. */}
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
