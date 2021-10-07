import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { formatDate } from "../../../hooks/getBoardInfo";

import ShowMore from "../../../components/Button/ShowMore";
import PreviewOnlyTitle from "../../../layout/PreviewOnlyTitle";

const BoardWrapper = styled.div`
  margin: 8px 8px 0px 8px;
  padding-bottom: 16px;

  h2 {
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
  }

  .popular-container {
    margin: 12px 16px;
  }

  .popular-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .popular-contents-wrapper {
    margin: 16px 16px 0px 16px;
  }
`;

const HotBoardList = () => {
  const [hotList, setHotList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/board/main/hot");
      setHotList(result.data.data);
    };

    fetchData();
  }, []);

  return (
    <BoardWrapper className="board-wrapper">
      <div className="popular-container">
        <div className="popular-title-wrapper">
          <div>
            <h2>HOT 게시물</h2>
          </div>
          <ShowMore to="/board/list/7" />
        </div>
      </div>
      {hotList.map((item) => (
        <div className="popular-contents-wrapper" key={item.id}>
          <PreviewOnlyTitle
            boardId={item.id}
            title={item.title}
            date={formatDate(item.created_at)}
            like={item.like_num}
            comments={item.comment_num}
          />
        </div>
      ))}
    </BoardWrapper>
  );
};

export default HotBoardList;
