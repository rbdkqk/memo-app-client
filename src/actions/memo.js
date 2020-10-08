import axios from "axios";
import {
  MEMO_POST,
  MEMO_POST_SUCCESS,
  MEMO_POST_FAILURE,
  MEMO_LIST,
  MEMO_LIST_SUCCESS,
  MEMO_LIST_FAILURE,
} from "./ActionTypes";

/* MEMO POST */

// thunk 함수 : 함수의 인자로는 content 가 들어옵니다.
export function memoPostRequest(contents) {
  return (dispatch) => {
    // inform MEMO POST API is starting
    // thunk 함수가 실행되면, 맨 처음으로는 리듀서에게 메모작성 요청이 들어왔다는 객체를 전달해주고
    dispatch(memoPost());

    // axios 를 통해 API 와 통신 : API 에 객체를 전달하는데, 이 객체는 contents 필드의 값이 thunk 함수의 인자로 들어온 값인 객체입니다.
    return (
      axios
        .post(
          "http://localhost:4000/api/memo/",
          { contents },
          { withCredentials: true }
        )
        // 통신을 마치고 API 에서 객체를 리턴한 뒤에,
        .then((response) => {
          // 그 객체가 성공 객체이면 성공 action 객체를 리듀서에 전달하고,
          dispatch(memoPostSuccess());
        })
        // 에러객체가 리턴되면 실패 action 객체를 리듀서에 전달합니다. (이때 API 로부터 전달받은 에러객체의 코드값을 action.error 의 값으로 취합니다)
        .catch((error) => {
          dispatch(memoPostFailure(error.response.data.code));
        })
    );
  };
}

// 각각 메모 작성 요청중, 성공, 실패를 의미하는 action 객체를 리턴합니다.
export function memoPost() {
  return {
    type: MEMO_POST,
  };
}

export function memoPostSuccess() {
  return {
    type: MEMO_POST_SUCCESS,
  };
}

export function memoPostFailure(error) {
  return {
    type: MEMO_POST_FAILURE,
    error,
  };
}

/* MEMO LIST */
/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' memo or 'new' memo
        - id:        OPTIONAL; memo id (one at the bottom or one at the top) (listType 파라메터의 기준)
        - username:  OPTIONAL; find memos of following user
*/
export function memoListRequest(isInitial, listType, id, username) {
  return (dispatch) => {
    // inform memo list API is starting
    dispatch(memoList());

    let url = "http://localhost:4000/api/memo";

    return axios
      .get(url)
      .then((response) => {
        dispatch(memoListSuccess(response.data, isInitial, listType));
      })
      .catch((error) => {
        dispatch(memoListFailure());
      });
  };
}

export function memoList() {
  return {
    type: MEMO_LIST,
  };
}

export function memoListSuccess(data, isInitial, listType) {
  return {
    type: MEMO_LIST_SUCCESS,
    data,
    isInitial,
    listType,
  };
}

export function memoListFailure() {
  return {
    type: MEMO_LIST_FAILURE,
  };
}
