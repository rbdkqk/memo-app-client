import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Header extends Component {
  render() {
    // 로그인은 리디렉트를 돌려서 처리하고,
    const loginButton = (
      <li>
        <Link to="/login">
          <i className="material-icons">vpn_key</i>
        </Link>
      </li>
    );

    // 로그아웃은 리디렉트 없이 App.js에서 직접 처리한다.
    const logoutButton = (
      <li>
        <a onClick={this.props.onLogout}>
          <i className="material-icons">lock_open</i>
        </a>
      </li>
    );

    return (
      <div>
        <nav>
          <div className="nav-wrapper blue darken-1">
            <Link to="/" className="brand-logo center">
              MEMOPAD
            </Link>

            <ul>
              <li>
                <a onClick={this.toggleSearch}>
                  <i className="material-icons">search</i>
                </a>
              </li>
            </ul>

            <div className="right">
              {/* 전달받은 로그인 여부에 따라 logout 버튼을 렌더링하거나 login 버튼을 렌더링 할지 결정합니다. */}
              <ul>{this.props.isLoggedIn ? logoutButton : loginButton}</ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

//Header 컴포넌트 PropTypes 설정하기
Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
};

//Header 컴포넌트 defaultProps 설정하기
Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => {
    console.error("logout function not defined");
  },
};

/*
  props 의 type 과 기본값을 설정하는건 optional입니다. 즉, 귀찮으면 안해도 돼요!
  하지만, 이렇게 하는편이 나중에 읽기 편하고 유지보수하기가 쉬워지니까 하도록 하겠습니다.

  isLoggedn : 현재 로그인 상태인지 아닌지 알려주는 값
  onLogout : 함수형 props 로서 로그아웃을 담당함
  
*/
