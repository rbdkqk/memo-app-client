// MemoList 컴포넌트로부터 컴포넌트 매핑을 통해 렌더링 될 Memo 컴포넌트

import React, { Component } from "react";
import PropTypes from "prop-types";
import Materialize from "materialize-css";
import $ from "jquery";

class Memo extends Component {
  // componentDidUpdate() {
  //   // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
  //   // (TRIGGERED WHEN LOGGED IN)
  //   $("#dropdown-button-" + this.props.data._id).dropdown({
  //     belowOrigin: true, // Displays dropdown below the button
  //   });
  // }

  // componentDidMount() {
  //   // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
  //   // (TRIGGERED WHEN REFRESHED)
  //   $("#dropdown-button-" + this.props.data._id).dropdown({
  //     belowOrigin: true, // Displays dropdown below the button
  //   });
  // }

  render() {
    // 드롭다운 메뉴인데, 실패
    const dropDownMenu = (
      <div className="option-button">
        <a
          className="dropdown-button"
          id={`dropdown-button-${this.props.data._id}`}
          data-activates={`dropdown-${this.props.data._id}`}
        >
          <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${this.props.data._id}`} className="dropdown-content">
          <li>
            <a>Edit</a>
          </li>
          <li>
            <a>Remove</a>
          </li>
        </ul>
      </div>
    );

    // memoView 안에서 dropDownMenu 를 렌더링할 때 프롭스로 전달받은 ownership 의 값이 true 일때만 렌더링 하도록 설정했습니다.
    const memoView = (
      <div className="card">
        <div className="info">
          <a className="username">{this.props.data.writer}</a> wrote a log · 1
          seconds ago
          {this.props.ownership ? dropDownMenu : undefined}
        </div>
        <div className="card-content">{this.props.data.contents}</div>
        <div className="footer">
          <i className="material-icons log-footer-icon star icon-button">
            star
          </i>
          <span className="star-count">0</span>
        </div>
      </div>
    );

    return <div className="container memo">{memoView}</div>;
  }
}

Memo.propTypes = {
  data: PropTypes.object,
  ownership: PropTypes.bool,
};

Memo.defaultProps = {
  data: {
    _id: "id1234567890",
    writer: "Writer",
    contents: "Contents",
    is_edited: false,
    date: {
      edited: new Date(),
      created: new Date(),
    },
    starred: [],
  },
  ownership: true,
};

export default Memo;
