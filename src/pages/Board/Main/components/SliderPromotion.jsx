import React from "react";
import styled from "styled-components";
import ShowMore from "../../../../components/Button/ShowMore";

import PreviewBoard from "../../../../layout/PreviewBoard";

const SliderWrapper = styled.div`
  h2 {
    margin: 0px !important;
  }

  .board-container {
    margin: 9px 8px 0px 8px;
  }

  .top-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 16px 16px 0px 16px;
  }

  .realtime-board-wrapper {
    margin: 12px 16px 0px 16px;
    padding-bottom: 16px;
  }

  .item-wrapper {
    margin-top: 16px;
  }
`;

const SliderPromotion = () => {
  return (
    <SliderWrapper>
      <div className="board-wrapper board-container">
        <div className="top-wrapper align-center">
          <div>
            <h2>인기 게시물</h2>
          </div>
          <ShowMore to="/board" />
        </div>
        <div className="realtime-board-wrapper">
          <div className="item-wrapper">
            <PreviewBoard
              boardId={1}
              title="인기게시물"
              contents="어어어어"
              category="1212"
              like={1}
              comments={2}
            />
          </div>
          <div className="item-wrapper">
            <PreviewBoard
              boardId={10}
              title="인기게시물"
              contents="어어어어"
              category="1212"
              like={1}
              comments={2}
            />
          </div>
        </div>
      </div>

      <div className="board-wrapper board-container">
        <div className="top-wrapper align-center">
          <div>
            <h2>홍보 게시판</h2>
          </div>
          <ShowMore to="/board/list/9" />
        </div>
        <div className="realtime-board-wrapper">
          <div className="item-wrapper">
            <PreviewBoard
              boardId={13}
              title="인기게시물"
              contents="어어어어"
              category="1212"
              like={1}
              comments={2}
            />
          </div>
          <div className="item-wrapper">
            <PreviewBoard
              boardId={21}
              title="인기게시물"
              contents="어어어어"
              category="1212"
              like={1}
              comments={2}
            />
          </div>
        </div>
      </div>
    </SliderWrapper>
  );
};

export default SliderPromotion;
