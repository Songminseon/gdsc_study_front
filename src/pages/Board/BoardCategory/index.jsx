import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import { COLORS } from "../../../components/Colors";
import BoardNavigation from "../../../layout/BoardNaviagtion";
import PreviewBoard from "../../../layout/PreviewBoard";
import WritePost from "../../../components/Button/WritePost";

import { getCategory } from "../../../hooks/getBoardInfo";

const DetailWrapper = styled.div`
  padding-top: 48px;

  .loading-area {
    margin-top: 30%;
    margin-left: calc(50% - 25px);
  }

  .no-result {
    margin-top: 30%;
    text-align: center;
    font-size: 16px;
    color: ${COLORS.grey_600};
    font-weight: 700;
  }

  .board-container {
    padding: 8px 16px;
    border-bottom: 1px solid ${COLORS.grey_400};
  }
`;

const Index = ({ match }) => {
  const [title, setTitle] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoryNum = match.params.category;
    setTitle(getCategory(parseInt(categoryNum)));
    const fetchData = async () => {
      const categoryNum = match.params.category;
      const result = await axios(`/api/board/${categoryNum}`);
      setBoardList(result.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <DetailWrapper>
      <div className="top-navigation">
        <BoardNavigation title={title} />
      </div>
      {isLoading ? (
        <div className="loading-area">
          <ClipLoader color={COLORS.red} loading={isLoading} size={50} />
        </div>
      ) : boardList.length === 0 ? (
        <p className="no-result">아직 등록된 게시물이 없습니다.</p>
      ) : (
        boardList.map((item) => (
          <div className="board-container">
            <PreviewBoard
              key={item.id}
              boardId={item.id}
              title={item.title}
              content={item.content}
              like={item.like_num}
              comment={item.comment_num}
            />
          </div>
        ))
      )}

      <div className="fixed-button">
        <WritePost />
      </div>
    </DetailWrapper>
  );
};

export default Index;
