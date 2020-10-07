import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Write extends Component {
  state = {
    contents: "",
  };

  // 사용자가 textarea 태그에 입력한 값을 Write 컴포넌트의 state 로 지정하는 메소드
  handleChange = (e) => {
    this.setState({
      contents: e.target.value,
    });
  };

  // 컴포넌트 state 를 인자로 하여 thunk 를 실행하고, textarea 를 비우도록 설정
  handlePost = () => {
    let contents = this.state.contents;

    this.props.onPost(contents).then(() => {
      this.setState({
        contents: "",
      });
    });
  };

  render() {
    return (
      <div className="container write">
        <div className="card">
          <div className="card-content">
            <textarea
              className="materialize-textarea"
              placeholder="Write down your memo"
              onChange={this.handleChange}
              value={this.state.contents}
            ></textarea>
          </div>
          <div className="card-action">
            {/* POST 버튼(a 태그)을 클릭하면 handlePost 메소드가 실행되도록 onClick 이벤트에 등록 */}
            <a onClick={this.handlePost}>POST</a>
          </div>
        </div>
      </div>
    );
  }
}

Write.propTypes = {
  onPost: PropTypes.func,
};

Write.defaultProps = {
  onPost: (contents) => {
    console.error("post function not defined");
  },
};
