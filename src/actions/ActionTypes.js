// ActionTypes 는 action 객체의 타입(type) 값을 의미하며, 문자열을 리턴합니다.

/* AUTHENTICATION */

// Register
export const AUTH_REGISTER = "AUTH_REGISTER";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";

// Login
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

// Check sessions
export const AUTH_GET_STATUS = "AUTH_GET_STATUS";
export const AUTH_GET_STATUS_SUCCESS = "AUTH_GET_STATUS_SUCCESS";
export const AUTH_GET_STATUS_FAILURE = "AUTH_GET_STATUS_FAILURE";

// Logout
export const AUTH_LOGOUT = "AUTH_LOGOUT";

// Post memo
export const MEMO_POST = "MEMO_POST";
export const MEMO_POST_SUCCESS = "MEMO_POST_SUCCESS";
export const MEMO_POST_FAILURE = "MEMO_POST_FAILURE";

// Get memo list from DB
export const MEMO_LIST = "MEMO_LIST";
export const MEMO_LIST_SUCCESS = "MEMO_LIST_SUCCESS";
export const MEMO_LIST_FAILURE = "MEMO_LIST_FAILURE";

// Edit memo
export const MEMO_EDIT = "MEMO_EDIT";
export const MEMO_EDIT_SUCCESS = "MEMO_EDIT_SUCCESS";
export const MEMO_EDIT_FAILURE = "MEMO_EDIT_FAILURE";
