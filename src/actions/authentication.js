// 액션생성자 함수와 thunk 를 정의하는 파일입니다.

import axios from "axios";
import {
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_GET_STATUS,
  AUTH_GET_STATUS_SUCCESS,
  AUTH_GET_STATUS_FAILURE,
  AUTH_LOGOUT,
} from "./ActionTypes";

/*  thunk 함수.

  registerRequest 함수가 실행되면 먼저 action.type 이 "AUTH_REGISTER" 인 액션객체를 리듀서로 보냅니다. 
  (12 번째 줄) 이는 회원가입 요청을 시작했다는 의미입니다.

  그 뒤에 axios 를 이용하여 3-1) 에서 구현한 API 와 통신합니다. 
  req.body 로 전달하는 값은 { username: "...", password: "..." } 형태의 JSON 객체입니다. 
  통신이 끝나면 API 에서는 JSON 데이터를 리스폰스(리턴) 하는데, 
  성공하면 { "success": true } 를, 실패하면 에러객체를 리턴합니다.

  통신이 끝나면, API 에서 리스폰스하는 데이터에 따라 action.type 값이 "AUTH_REGISTER_SUCCESS" 인 객체를 리듀서로 보내거나(성공), 
  action.type 값이 "AUTH_REGISTER_FAILURE" 인 객체를 리듀서로 보냅니다.

*/

/* REGISTER */
export function registerRequest(username, password) {
  return (dispatch) => {
    // Inform Register API is starting
    dispatch(register());

    return axios
      .post(
        "http://localhost:4000/api/account/signup",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        dispatch(registerSuccess());
      })
      .catch((error) => {
        dispatch(registerFailure(error.response.data.code));
      });
  };
}

// 액션생성자 함수로, 액션객체(action 객체의 type 값은 "AUTH_REGISTER")를 리턴합니다.
export function register() {
  return {
    type: AUTH_REGISTER,
  };
}

// 액션생성자 함수로, action.type 값이 "AUTH_REGISTER_SUCCESS"인 객체를 리턴합니다.
export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS,
  };
}

// 액션생성자 함수로, action.type 값이 "AUTH_REGISTER_FAILURE"인 객체를 리턴
export function registerFailure(error) {
  return {
    type: AUTH_REGISTER_FAILURE,
    error,
  };
}

/* 디스패치 (dispatch)

디스패치는 스토어의 내장함수 중 하나입니다. 
디스패치는, 액션을 발생 시키는 것 이라고 이해하시면 됩니다. 
dispatch 라는 함수에는 액션을 파라미터로 전달합니다.
dispatch(action) 이런식으로 말이죠.

그렇게 호출을 하면, 스토어는 리듀서 함수를 실행시켜서, 
해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어줍니다.

*/

// -------------------------------------------------------------------------------------

/* LOGIN */
export function loginRequest(username, password) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    // API REQUEST
    return axios
      .post(
        "http://localhost:4000/api/account/signin",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        // SUCCEED
        dispatch(loginSuccess(username));
      })
      .catch((error) => {
        // FAILED
        dispatch(loginFailure());
      });
  };
}

export function login() {
  return {
    type: AUTH_LOGIN,
  };
}

export function loginSuccess(username) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    username,
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
  };
}

// -------------------------------------------------------------------------------------

/* GET STATUS */
export function getStatusRequest() {
  return (dispatch) => {
    // inform Get Status API is starting
    dispatch(getStatus());

    return axios
      .get("http://localhost:4000/api/account/getInfo", {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(getStatusSuccess(response.data.info.username)); //HTTP 틍신을 통해 username을 빋이옴
      })
      .catch((error) => {
        dispatch(getStatusFailure());
      });
  };
}

export function getStatus() {
  return {
    type: AUTH_GET_STATUS,
  };
}

export function getStatusSuccess(username) {
  return {
    type: AUTH_GET_STATUS_SUCCESS,
    username,
  };
}

export function getStatusFailure() {
  return {
    type: AUTH_GET_STATUS_FAILURE,
  };
}

// -------------------------------------------------------------------------------------

/* Logout */
export function logoutRequest() {
  return (dispatch) => {
    return axios
      .post("http://localhost:4000/api/account/signout", {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(logout());
      });
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}
