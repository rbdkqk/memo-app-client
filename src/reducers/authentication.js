// 리듀서 : dispatch 함수로 부터 전달받은 action 객체의 type 값에 따라, state 를 변경하는 함수입니다.

import * as types from "../actions/ActionTypes";

const initialState = {
  login: {
    status: "INIT",
  },
  register: {
    status: "INIT",
    error: -1,
  },
  status: {
    valid: false,
    isLoggedIn: false,
    currentUser: "",
  },
};

// initialState 를 정의
// default parameter 를 사용하여 state 값에 아무것도 들어오지 않았을 때 initialState 를 사용하도록 설정
// action.type 값에 따라 state 를 변경할 떄, 원래 state 를 손상시키지 않고 새로운 state 를 리턴해야하기 때문에 ES6의 spread operator 가 사용됨
export default function authentication(state = initialState, action) {
  switch (action.type) {
    /* REGISTER */
    case types.AUTH_REGISTER:
      return {
        ...state,
        register: {
          status: "WAITING",
          error: -1,
        },
      };
    case types.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          status: "SUCCESS",
        },
      };
    case types.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          status: "FAILURE",
          error: action.error,
        },
      };

    /* LOGIN */
    case types.AUTH_LOGIN:
      return {
        ...state,
        login: {
          status: "WAITING",
        },
      };
    case types.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          status: "SUCCESS",
        },
        status: {
          ...state.status,
          isLoggedIn: true,
          currentUser: action.username,
        },
      };
    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login: {
          status: "FAILURE",
        },
      };

    /* CHECK SESSIONS */
    case types.AUTH_GET_STATUS:
      return {
        ...state,
        status: {
          ...state.staus,
          // status.isLoggedIn 키는 로그인 상태를 의미하는데, AUTH_GET_STATUS 때는 true 로 설정했습니다. (처음 세션 확인을 요청한 상태)
          isLoggedIn: true,
        },
      };
    case types.AUTH_GET_STATUS_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          // status.valid 는 세션이 유효할 때 ture 값을 가지고, 만료되었거나 비정상적이면 false 값을 가집니다.
          valid: true,
          currentUser: action.username,
        },
      };
    case types.AUTH_GET_STATUS_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          valid: false,
          isLoggedIn: false,
        },
      };

    /* LOGOUT */
    case types.AUTH_LOGOUT:
      return {
        ...state,
        status: {
          ...state.status,
          isLoggedIn: false,
          currentUser: "",
        },
      };

    default:
      return state;
  }
}
