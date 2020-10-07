// combineReducers 를 이용해 여러개의 리듀서를 합치는 역할을 하는 파일입니다.
// 코드를 작성하면서 authentication 이외의 리듀서도 index.js 에 import 할 예정입니다.

import authentication from "./authentication";
import memo from "./memo";

import { combineReducers } from "redux";

export default combineReducers({
  authentication,
  memo,
});
