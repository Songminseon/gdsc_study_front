import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { formatDate, getCategory } from "hooks/getBoardInfo";

import PreviewProfile from "../../../layout/PreviewProfile";
import PreviewBoard from "../../../layout/PreviewBoard";
import { COLORS } from "components/Colors";

const BoardWrapper = styled.div`
  margin: 8px 8px 0px 8px;
  padding-bottom: 16px;

  h2 {
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
  }

  .no-result {
    text-align: center;
    color: ${COLORS.grey_600};
    font-size: 12px;
  }

  .realtime-container {
    margin: 12px 16px;
  }

  .realtime-board-wrapper {
    margin: 12px 16px 0px 16px;
  }
`;

const RealTimeBoardList = () => {
  const [realtimeList, setRealtimeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/board/main/realtime");
      setRealtimeList(result.data.data);
    };
    fetchData();
  }, []);

  return (
    <BoardWrapper className="board-wrapper">
      <div className="realtime-container">
        <h2>실시간 인기글</h2>
      </div>
      {realtimeList.length === 0 ? (
        <p className="no-result">실시간 인기글이 없습니다.</p>
      ) : (
        realtimeList.map((item) => (
          <div className="realtime-board-wrapper">
            <PreviewProfile
              profileUrl={item.profile_pic}
              nick={item.nickname}
              date={formatDate(item.created_at)}
            />
            <PreviewBoard
              boardId={item.id}
              title={item.title}
              content={item.content}
              category={getCategory(parseInt(item.board_category_id))}
              like={item.like}
              comments={item.comments}
            />
          </div>
        ))
      )}
    </BoardWrapper>
  );
};

export default RealTimeBoardList;
