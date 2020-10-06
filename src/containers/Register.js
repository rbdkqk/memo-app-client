// '/register' url 경로로 접근하면 렌더링되는 컨테이너 컴포넌트인 Register 에 Authentication 컴포넌트를 렌더링하겠습니다.
// 이 때, Authentication 에 mode props 를 false 로 전달해야 회원가입 뷰가 렌더링 됩니다. (Authenticaction 컴포넌트에서 그렇게 정함)

import React, { Component } from "react";
import { Authentication } from "../components";
import { connect } from "react-redux";
import { registerRequest } from "../actions/authentication";
import Materialize from "materialize-css";
import $ from "jquery";
// import "materialize-css";

class Register extends Component {
  /*  thunk 메소드를 실행하는 메소드인 handleRegister 를 정의

      먼저 thunk 를 실행합니다. thunk 는 BACK-END 와 통신하여 리덕스 state를 변경합니다.
      실행후 .then() 메소드를 통해 다음코드를 실행하는데, 이 시점은 리덕스 state 가 변경된 이후의 시점입니다.
      .then() 메소드의 콜백함수는 this.props.status (리덕스로 연결된 register 상태 - WAITING / SUCCESS / FAILURE 중의 하나) 의 값에 따라 다른방식으로 작동하도록 되어 있습니다.
      
      만약 this.props.status 의 값이 SUCCESS 라면 Materializecss 의 알림메소드로 회원가입에 성공했으니 로그인하라는 알림을 주고 로그인 페이지로 이동시킵니다.
        * SUCCESS 일때 true를, SUCCESS 가 아닐때 false 를 리턴하는데, 이는 Authentication 의 state(input 창)를 비우는것과 연관이 있습니다. 
        * react-router v4 에서는 라우트컴포넌트에 기본적으로 history, location, match 객체를 프롭스로 전달합니다. (browserHistory 지원 중단)
      
        만약 this.props.status 의 값이 SUCCESS 가 아니라면 업데이트된 에러코드(state)를 통해 Materializecss 알림을 띄웁니다.

  */

  // 하위 컴포넌트로 내려줄 handleRegister 메소드
  handleRegister = (id, pw) => {
    // react-redux connect 를 통해 받아온 registerRequest 메소드 (from "../actions/authentication";)
    return this.props.registerRequest(id, pw).then(() => {
      if (this.props.status === "SUCCESS") {
        Materialize.toast("Success! Please log in.", 2000); // toast 띄우고,
        // react-router v4 에서는 라우트컴포넌트에 기본적으로 history, location, match 객체를 프롭스로 전달합니다.
        this.props.history.push("/login"); // 리디렉트
        return true;
      } else {
        /*  ERROR CODES:
            1: BAD USERNAME
            2: BAD PASSWORD
            3: USERNAME EXISTS
        */
        let errorMessage = [
          "Invalid Username",
          "Password is too short",
          "Username already exists",
        ];

        let $toastContent = $(
          '<span style="color: #FFB4BA">' +
            errorMessage[this.props.errorCode - 1] +
            "</span>"
        );
        Materialize.toast($toastContent, 2000); // toast 띄우고,
        return false;
      }
    });
  };

  render() {
    return (
      <div>
        <Authentication mode={false} onRegister={this.handleRegister} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.register.status,
    errorCode: state.authentication.register.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (id, pw) => {
      return dispatch(registerRequest(id, pw));
    },
  };
};

// react-redux 의 connect 를 이용하여 Register 컴포넌트(컨테이너)와 리덕스를 연결합니다.
// 이 때, mapStateToProps 와 mapDispatchToProps 를 통하여,
// 리덕스 state 와 thunk 함수를 Register 컴포넌트로 들어온 프롭스처럼 사용할 수 있습니다.
export default connect(mapStateToProps, mapDispatchToProps)(Register);

/*
  
  Redux 연결을 통해 Register 컴포넌트에서 thunk 를 프롭스처럼 사용할 수 있게 되었습니다. 
  (this.props.registerRequest)

  이 thunk 를 실행하는 메소드를 Register 컴폰넌트 안에서 정의하여 Authentication 컴포넌트로 전달해 주도록하겠습니다.

*/

// react-redux 의 connect : 공부 매우 필요
