// Register 컨테이너 컴포넌트에서 렌더링할 Authentication 컴포넌트
// Authentication 컴포넌트에서는 Materializecss 를 이용하여 view 를 만들어 렌더링 할 것입니다.

// 로그인 뷰와 회원가입 뷰를 모두 가진 컴포넌트임
// 렌더링하는 컴포넌트로부터 전달받는 mode props 를 통해, 어떤 뷰를 보여줄지 결정합니다.
// 전달받는 mode props 가 true 라면 로그인 뷰를 렌더링하고, false 라면 회원가입 뷰를 렌더링합니다.
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Authentication extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  // 인자로 들어온 e 는 이벤트 객체를 의미하며, e.charCode 는 사용자가 입력한 키의 코드 번호를 의미합니다.
  // e.charCode 가 13 이면 엔터키를 의미합니다.
  handleKeyPress = (e) => {
    if (e.charCode == 13) {
      if (this.props.mode) {
        this.handleLogin();
      } else {
        this.handleRegister();
      }
    }
  };

  handleRegister = () => {
    let id = this.state.username;
    let pw = this.state.password;

    this.props.onRegister(id, pw).then((result) => {
      if (!result) {
        this.setState({
          username: "",
          password: "",
        });
      }
    });
  };

  handleLogin = () => {
    let id = this.state.username;
    let pw = this.state.password;

    this.props.onLogin(id, pw).then((success) => {
      if (!success) {
        this.setState({
          password: "",
        });
      }
    });
  };

  render() {
    // input 창들은 로그인 뷰와 회원가입 뷰 모두 같기 때문에,
    // inputBoxes 로 분리하여 로그인, 회원가입 뷰에서 사용하였습니다.
    const inputBoxes = (
      <div>
        <div className="input-field col s12 username">
          <label>Username</label>
          <input
            name="username"
            type="text"
            className="validate"
            onChange={this.handleChange}
            value={this.state.username}
          />
        </div>
        <div className="input-field col s12">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="validate"
            onChange={this.handleChange}
            value={this.state.password}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );

    const loginView = (
      <div>
        <div className="card-content">
          <div className="row">
            {inputBoxes}
            <a
              className="waves-effect waves-light btn"
              onClick={this.handleLogin}
            >
              SUBMIT
            </a>
          </div>
        </div>

        <div className="footer">
          <div className="card-content">
            <div className="right">
              New Here? <Link to="/register">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    );

    const registerView = (
      <div className="card-content">
        <div className="row">
          {inputBoxes}
          <a
            className="waves-effect waves-light btn"
            onClick={this.handleRegister}
          >
            CREATE
          </a>
        </div>
      </div>
    );

    return (
      <div className="container auth">
        {/* Link 컴포넌트는 SPA 에서 사용되는 컴포넌트로, 
        url을 이동할 때 전체페이지를 새로고침하지 않고 렌더링할 대상만 바꾸는 컴포넌트 입니다. */}
        <Link className="logo" to="/">
          MEMOPAD
        </Link>
        <div className="card">
          <div className="header blue white-text center">
            <div className="card-content">
              {/* 전달받는 mode props 가 true 라면 로그인 뷰를 렌더링하고, false 라면 회원가입 뷰를 렌더링합니다. */}
              {this.props.mode ? "LOGIN" : "REGISTER"}
            </div>
          </div>
          {this.props.mode ? loginView : registerView}
        </div>
      </div>
    );
  }
}

Authentication.propTypes = {
  mode: PropTypes.bool,
  onRegister: PropTypes.func,
  onLogin: PropTypes.func,
};

Authentication.defaultProps = {
  mode: true,
  onRegister: (id, pw) => {
    console.error("register function is not defined");
  },
  onLogin: (id, pw) => {
    console.error("login function not defined");
  },
};

export default Authentication;
