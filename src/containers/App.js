import React, { Component } from "react";
import { Header } from "../components";
import { connect } from "react-redux";
import { getStatusRequest, logoutRequest } from "../actions/authentication";
import Materialize from "materialize-css";
import $ from "jquery";

class App extends Component {
  //  App 컴포넌트가 새로고침 될 때 thunk (this.props.getStatusRequest) 함수가 실행되도록 코드를 작성해 보겠습니다.
  // * 페이지가 새로고침 완료된 후는 component lifecycle 중 componentDidMount 를 의미합니다.
  componentDidMount() {
    //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
    // get cookie by name

    /*  getCookie 함수 : 인자로 들어오는 값의 내용을 알아내는 함수입니다.  
      (위의 예제에서는 key 값의 내용을 알아냄 : 로그인할 때 로그인 정보객체를 base64 인코드하여 쿠키에 key= 에 할당했으므로)

      document.cookie 앞에 "; " 문자를 붙여 value 라는 변수에 담습니다.
      그리고 value 값을 "; "+인자로 들어온 값+"=" 으로 나눠서 parts 변수에 담습니다.. (문자열을 split의 인자로 나누어 배열로 리턴)

      만약 parts 의 길이가 2라면 (value 값 안에 "; "+인자로 들어온 값+"=" 가 있어서 나눠짐 / 없다면 길이가 1인 배열리턴), 
      마지막 원소를 제거하고 제거된 원소(리턴값)를 다시 ';' 로 나누고 나눈 배열중에서 앞의 원소를 제거한 리턴값을 리턴합니다. 
    */
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // get loginData from cookie
    let loginData = getCookie("key");

    // if loginData is undefined, do nothing
    if (typeof loginData === "undefined") return;

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    // if not logged in, do nothing
    if (!loginData.isLoggedIn) return;

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(() => {
      // if session is not valid
      if (!this.props.status.valid) {
        // logout the session
        loginData = {
          isLoggedIn: false,
          username: "",
        };

        document.cookie = "key=" + btoa(JSON.stringify(loginData));

        // and notify
        let $toastContent = $(
          '<span style="color: #FFB4BA">Your session is expired, please log in again</span>'
        );
        Materialize.toast($toastContent, 4000);
      }
    });
  }

  handleLogout = () => {
    this.props.logoutRequest().then(() => {
      Materialize.toast("Good Bye!", 2000);

      // EMPTIES THE SESSION
      let loginData = {
        isLoggedIn: false,
        username: "",
      };

      document.cookie = "key=" + btoa(JSON.stringify(loginData));
    });
  };

  render() {
    //Header 는 register, login 뷰에서는 렌더링되면 안되므로 코드를 조금 변경해 주도록 합시다.
    let re = /(login|register)/; // 정규표현식 패턴 : 내용은 'login 혹은 register 라는 문자열' 입니다.
    let isAuth = re.test(this.props.location.pathname); // 위에서 만든 패턴을 url 에 검사하는 isAuth 를 만들었습니다. url 에 login 이나 register 라는 글자가 있으면 isAuth 의 값은 참이 됩니다.
    // * 라우트에 렌더링되는 컴포넌트는 react-router-dom 에 의하여 history, location, match 프롭스를 전달받습니다.
    // 참고 : Route 와 파라미터, 쿼리 : https://pro-self-studier.tistory.com/76?category=664874

    // isAuth 값이 false 면(url 에 register/login 글자가 포함되어 있지 않다면), Header 컴포넌트를 렌더링하겠다
    return (
      <div>
        {isAuth ? undefined : (
          <Header
            isLoggedIn={this.props.status.isLoggedIn}
            onLogout={this.handleLogout}
          />
        )}
      </div>
    );
    // return (
    //   <div>
    //     <Header />
    //     {this.props.children}
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status,
  };
};

// App 컨테이너에서 아래 메소드를 props 처럼 사용할 수 있도록 하였습니다.
const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
