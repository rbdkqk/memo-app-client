import * as types from "../actions/ActionTypes";

// 최초 state
const initialState = {
  post: {
    status: "INIT",
    error: -1,
  },
  list: {
    status: "INIT",
    data: [],
    isLast: false,
  },
  edit: {
    status: "INIT",
    error: -1,
  },
  remove: {
    status: "INIT",
    error: -1,
  },
  star: {
    status: "INIT",
    error: -1,
  },
};

// reducer 함수
export default function memo(state = initialState, action) {
  switch (action.type) {
    // memo post
    case types.MEMO_POST:
      return {
        ...state,
        post: {
          ...state.post,
          status: "WAITING",
          error: -1,
        },
      };
    case types.MEMO_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          status: "SUCCESS",
        },
      };
    case types.MEMO_POST_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          status: "FAILURE",
          error: action.error,
        },
      };

    // memo read
    case types.MEMO_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          status: "WAITING",
        },
      };
    case types.MEMO_LIST_SUCCESS:
      if (action.isInitial) {
        return {
          ...state,
          list: {
            ...state.list,
            status: "SUCCESS",
            data: action.data,
            // isLast 값은, API 가 전달해 준 데이터의 길이가 6 이하일 때 true 가 되는 값으로,
            // 마지막 메모리스트인지 확인하는 용도로 사용됩니다.
            isLast: action.data.length < 6,
          },
        };
        // 처음 메모리스트를 요청한 것이 아니라 id 를 기준으로 (thunk 의 인자) 새 메모나 이전 메모를 불러오는 요청에 따른 state 변경코드입니다.
        // id 를 기준으로 새 메모들을 불러왔다면 data 배열의 앞에 새로 로딩된 메모가 위치해야하며,
        // 이전 메모를 불러왔다면 data 배열의 뒤에 위치해야합니다.
      } else {
        if (action.listType === "new") {
          // 배열의 앞부분에 추가
          return {
            ...state,
            list: {
              ...state.list,
              status: "SUCCESS",
              data: [...action.data, ...state.list.data],
            },
          };
        } else {
          //action.listType === 'older' //배열의 뒷부분에 추가
          return {
            ...state,
            list: {
              ...state.list,
              status: "SUCCESS",
              data: [...state.list.data, ...action.data],
              isLast: action.data.length < 6,
            },
          };
        }
      }
      return state;
    case types.MEMO_LIST_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          status: "FAILURE",
        },
      };

    // memo update
    case types.MEMO_EDIT:
      return {
        ...state,
        edit: {
          ...state.edit,
          status: "WAITING",
          error: -1,
          memo: undefined,
        },
      };
    case types.MEMO_EDIT_SUCCESS:
      let editBefore = state.list.data.slice(0, action.index);
      let editAfter = state.list.data.slice(action.index + 1);
      return {
        ...state,
        edit: {
          ...state.edit,
          status: "SUCCESS",
        },
        list: {
          ...state.list,
          data: [...editBefore, action.memo, ...editAfter],
        },
      };
    case types.MEMO_EDIT_FAILURE:
      return {
        ...state,
        edit: {
          ...state.edit,
          status: "FAILURE",
          error: action.error,
        },
      };
    default:
      return state;
  }
}
