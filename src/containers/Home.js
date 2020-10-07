import React from "react";
import { Write } from "../components";
import { connect } from "react-redux";
import { memoPostRequest } from "../actions/memo";

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

  render() {
    const write = <Write onPost={this.handlePost} />;

    return (
      // 로그인 된 상태에서만 Write 컴포넌트를 렌더링하도록 설정했습니다.
      <div className="wrapper">{this.props.isLoggedIn ? write : undefined}</div>
    );
  }
}

// 리덕스 state 와 thunk 함수를, Home 컨테이너가 전달받은 props 처럼 사용할 수 있도록 설정했습니다.
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    postStatus: state.memo.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memoPostRequest: (contents) => {
      return dispatch(memoPostRequest(contents));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
