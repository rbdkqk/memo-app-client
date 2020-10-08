// Home 컨테이너에서 렌더링할 Memo 들의 집합체인 MemoList 컴포넌트

import React, { Component } from "react";
import { Memo } from "../components";
import PropTypes from "prop-types";

class MemoList extends Component {
  render() {
    // 이 data 는 배열 형식으로, 객체 형태로 이루어진 각각의 원소를 가지고 있습니다.
    const mapToComponents = (data) => {
      // map 메소드의 첫 번째 인자는 콜백함수이며 콜백함수에 들어오는 인자는 배열의 원소, 인덱스, (배열 전체) 입니다.
      // map 메소드는 원래 배열과 같은길이의 배열을 리턴하며 각 원소는 콜백함수의 리턴값이 됩니다.
      return data.map((memo, i) => {
        return (
          // // 따라서, 컴포넌트 매핑의 결과물은 <Memo ... /> 컴포넌트의 배열입니다. (길이는 매핑의 인자로 들어간 data 와 같음)
          <Memo
            data={memo}
            // ownerShip props : 현재 로그인 된 데이터와 메모의 작성자가 일치하면 true 가 되는 값
            // Memo 컴포넌트 안에서 드롭다운 메뉴를 보이도록 하는 역할을 수행합니다.
            ownership={memo.writer === this.props.currentUser}
            key={memo._id}
            index={i}
          />
        );
      });
    };
    return <div>{mapToComponents(this.props.data)}</div>;
  }
}

MemoList.propTypes = {
  data: PropTypes.array,
  currentUser: PropTypes.string,
};

MemoList.defaultProps = {
  data: [],
  currentUser: "",
};

export default MemoList;
