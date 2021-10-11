import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import ShowMore from "../../../../components/Button/ShowMore";
import PreviewBoard from "../../../../layout/PreviewBoard";
import { formatDate } from "@Hooks/getBoardInfo";
import { COLORS } from "@Component/Colors";

const SliderWrapper = styled.div`
  h2 {
    margin: 0px !important;
  }

  .board-container {
    margin: 9px 8px 0px 8px;
  }

  .no-result {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: ${COLORS.grey_600};
    font-weight: 700;
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

const SliderCareer = () => {
  const [careerList, setCareerList] = useState([]);
  const [hotList, setHotList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/board/main/filter?category=${8}&hot=0`);
      const result2 = await axios(`/api/board/main/filter?category=${8}&hot=1`);

      setCareerList(result.data.data);
      setHotList(result2.data.data);
    };

    fetchData();
  }, []);

  return (
    <SliderWrapper>
      <div className="board-wrapper board-container">
        <div className="top-wrapper align-center">
          <div>
            <h2>인기 게시물</h2>
          </div>
        </div>
        <div className="realtime-board-wrapper">
          {hotList.length === 0 ? (
            <p className="no-result">아직 인기게시물이 없어요.</p>
          ) : (
            hotList.map((item) => (
              <div className="item-wrapper">
                <PreviewBoard
                  boardId={item.id}
                  title={item.title}
                  category={formatDate(item.created_at)}
                  like={item.like_num}
                  comments={item.comments}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="board-wrapper board-container">
        <div className="top-wrapper align-center">
          <div>
            <h2>공기업 게시판</h2>
          </div>
          <ShowMore to="/board/list/8" />
        </div>
        <div className="realtime-board-wrapper">
          {careerList.map((item) => (
            <div className="item-wrapper">
              <PreviewBoard
                boardId={item.id}
                title={item.title}
                category={formatDate(item.created_at)}
                like={item.like_num}
                comments={item.comments}
              />
            </div>
          ))}
        </div>
      </div>
    </SliderWrapper>
  );
};

export default SliderCareer;
