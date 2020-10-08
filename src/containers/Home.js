import React from "react";
import { Write, MemoList } from "../components";
import { connect } from "react-redux";
import {
  memoPostRequest,
  memoListRequest,
  memoEditRequest,
  memoRemoveRequest,
} from "../actions/memo";

import Materialize from "materialize-css";
import $ from "jquery";

class Home extends React.Component {
  // handlePost 메소드 : thunk 함수를 실행시키고 Redux state 가 변경된 이후를 정의하고 있습니다. (.then)
  handlePost = (contents) => {
    return this.props.memoPostRequest(contents).then(() => {
      if (this.props.postStatus.status === "SUCCESS") {
        // TRIGGER LOAD NEW MEMO
        Materialize.toast("Success!", 2000);
      } else {
        /*
          ERROR CODES
            1: NOT LOGGED IN
            2: CONTENTS IS NOT STRING
            3: EMPTY CONTENTS
        */
        let $toastContent;
        switch (this.props.postStatus.error) {
          case 1:
            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
            $toastContent = $(
              '<span style="color: #FFB4BA">You are not logged in</span>'
            );
            Materialize.toast($toastContent, 2000);
            setTimeout(() => {
              // Location.reload() 메서드 : 새로고침 버튼처럼 현재 리소스를 다시 불러옵니다.
              // The `reload()` method does the same as the reload button in your browser.
              window.location.reload(false);
              // 원래 코드는 `location.reload(false);` 이었는데, 작동하지 않음.
              // 이 글을 참고하여 수정함 : https://gist.github.com/jaytaylor/b14716671ae6a8cd057bd6d849670238
            }, 2000);
            break;
          case 2:
            $toastContent = $(
              '<span style="color: #FFB4BA">Contents should be string</span>'
            );
            Materialize.toast($toastContent, 2000);
            break;
          case 3:
            $toastContent = $(
              '<span style="color: #FFB4BA">Please write Something</span>'
            );
            Materialize.toast($toastContent, 2000);
            break;
          default:
            $toastContent = $(
              '<span style="color: #FFB4BA">Something Broke</span>'
            );
            Materialize.toast($toastContent, 2000);
            break;
        }
      }
    });
  };

  handleEdit = (id, index, contents) => {
    return this.props.memoEditRequest(id, index, contents).then(() => {
      if (this.props.editStatus.status === "SUCCESS") {
        Materialize.toast("Success!", 2000);
      } else {
        /*
                  ERROR CODES
                      1: INVALID ID,
                      2: CONTENTS IS NOT STRING
                      3: EMPTY CONTENTS
                      4: NOT LOGGED IN
                      5: NO RESOURCE
                      6: PERMISSION FAILURE
                */
        let errorMessage = [
          "Something broke",
          "Contents should be string",
          "Please write something",
          "You are not logged in",
          "That memo does not exist anymore",
          "You do not have permission",
        ];

        let error = this.props.editStatus.error;

        // NOTIFY ERROR
        let $toastContent = $(
          '<span style="color: #FFB4BA">' + errorMessage[error - 1] + "</span>"
        );
        Materialize.toast($toastContent, 2000);

        // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
        if (error === 4) {
          setTimeout(() => {
            window.location.reload(false);
          }, 2000);
        }
      }
    });
  };

  handleRemove = (id, index) => {
    this.props.memoRemoveRequest(id, index).then(() => {
      if (this.props.removeStatus.status === "SUCCESS") {
        // LOAD MORE MEMO IF THERE IS NO SCROLLBAR
        // 1 SECOND LATER. (ANIMATION TAKES 1SEC)
        // 메모를 지우는 통신을 성공하고 1초 뒤에 스크롤이 있는지 확인 => 없으면 전 메모 불러와 스크롤 생성
        setTimeout(() => {
          if ($("body").height() < $(window).height()) {
            this.loadOldMemo();
          }
        }, 1000);
      } else {
        // ERROR
        /*
                DELETE MEMO: DELETE /api/memo/:id
                ERROR CODES
                    1: INVALID ID
                    2: NOT LOGGED IN
                    3: NO RESOURCE
                    4: PERMISSION FAILURE
            */
        let errorMessage = [
          "Something broke",
          "You are not logged in",
          "That memo does not exist",
          "You do not have permission",
        ];

        // NOTIFY ERROR
        let $toastContent = $(
          '<span style="color: #FFB4BA">' +
            errorMessage[this.props.removeStatus.error - 1] +
            "</span>"
        );
        Materialize.toast($toastContent, 2000);

        // IF NOT LOGGED IN, REFRESH THE PAGE
        if (this.props.removeStatus.error === 2) {
          setTimeout(() => {
            location.reload(false);
          }, 2000);
        }
      }
    });
  };

  componentDidMount() {
    // DO THE INITIAL LOADING
    this.props.memoListRequest(true, undefined, undefined, undefined);
  }

  render() {
    const write = <Write onPost={this.handlePost} />;

    return (
      <div className="wrapper">
        {this.props.isLoggedIn ? write : undefined}
        <MemoList
          data={this.props.memoData}
          currentUser={this.props.currentUser}
          onEdit={this.handleEdit}
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}

// 리덕스 state 와 thunk 함수를, Home 컨테이너가 전달받은 props 처럼 사용할 수 있도록 설정했습니다.
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    postStatus: state.memo.post,
    currentUser: state.authentication.status.currentUser,
    memoData: state.memo.list.data,
    listStatus: state.memo.list.status,
    isLast: state.memo.list.isLast,
    editStatus: state.memo.edit,
    removeStatus: state.memo.remove,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memoPostRequest: (contents) => {
      return dispatch(memoPostRequest(contents));
    },
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id, username));
    },
    memoEditRequest: (id, index, contents) => {
      return dispatch(memoEditRequest(id, index, contents));
    },
    memoRemoveRequest: (id, index) => {
      return dispatch(memoRemoveRequest(id, index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
