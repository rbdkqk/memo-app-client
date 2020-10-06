import React, { Component } from "react";
import { Authentication } from "../components";
import { connect } from "react-redux";
import { loginRequest } from "../actions/authentication";
import Materialize from "materialize-css";
import $ from "jquery";

class Login extends Component {
  handleLogin = (id, pw) => {
    // 아래의 connect 덕분에 loginRequest 메소드를 props 로 넘겨받을 수 있음 ("from "../actions/authentication";")
    return this.props.loginRequest(id, pw).then(() => {
      if (this.props.status === "SUCCESS") {
        // create session data
        let loginData = {
          isLoggedIn: true,
          username: id,
        };

        // (쿠키에 저장할 때 객체를 만든 뒤, 해당 객체를 문자화(JSON.stringify 메소드) 시키고 base64 로 인코드한 뒤, 앞에 'key=' 를 붙여 저장합니다)
        // * 쿠키에 저장된 값을 이용하여 로그인 했는지 여부를 판단합니다.
        // * btoa 는 base64 로 인코드 하는 메소드입니다. 이에 대해 익숙치 않으신 분들은 아래의 링크를 참조해 주세요.
        // * base64 인코드, 디코드 메소드 - btoa(), atob() : https://pro-self-studier.tistory.com/106?category=659555
        document.cookie = "key=" + btoa(JSON.stringify(loginData));

        Materialize.toast("Welcome, " + id + "!", 2000); // toast 띄우기
        this.props.history.push("/"); // 리디렉트
        return true;
      } else {
        let $toastContent = $(
          '<span style="color: #FFB4BA">Incorrect username or password</span>'
        );
        Materialize.toast($toastContent, 2000); // toast 띄우기
        return false;
      }
    });
  };

  render() {
    return (
      <div>
        {/* (Authentication 컴포넌트에서 전달받은 mode props 의 값이 true 여야 로그인 뷰를 렌더링 하도록 설정) */}
        <Authentication mode={true} onLogin={this.handleLogin} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    },
  };
};

// connect 함수를 통해 Login 컨테이너와 Redux 를 연결합니다.
// 이 때, mapStateToProps 와 mapDispatchToProps 로, 리덕스 state 와 thunk 함수를, Login 컴포넌트로 들어온 props 처럼 사용할 수 있게 됩니다.
export default connect(mapStateToProps, mapDispatchToProps)(Login);
