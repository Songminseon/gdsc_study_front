import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import { COLORS } from "@Component/Colors";
import ShowMore from "../../../components/Button/ShowMore";
import MyboardItem from "./MyboardItem";
import { getCategory, getPinName } from "@Hooks/getBoardInfo";
import { isRecentBoard } from "@Hooks/getBoardInfo";

const MyboardWrapper = styled.div`
  margin: 24px 8px 0px 8px;

  h2 {
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
  }

  .loading-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }

  .myboard-container {
    margin: 12px 16px;
  }

  .myboard-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const MyboardList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [boardList, setBoardList] = useState([]);

  const [pinList, setPinList] = useState({
    isOnF: true,
    isOnS: true,
    isOnG: true,
    isOnN: true,
    isOnI: true,
    isOnInfo: true,
  });

  useEffect(() => {
    const storage = window.localStorage.getItem("board_pin");
    const defaultSetting = {
      isOnF: true,
      isOnS: true,
      isOnG: true,
      isOnN: true,
      isOnI: true,
      isOnInfo: true,
    };
    if (!storage) {
      window.localStorage.setItem("board_pin", JSON.stringify(defaultSetting));
    } else {
      const storageJson = JSON.parse(storage);
      setPinList({
        isOnF: storageJson.isOnF,
        isOnS: storageJson.isOnS,
        isOnG: storageJson.isOnG,
        isOnN: storageJson.isOnN,
        isOnI: storageJson.isOnI,
        isOnInfo: storageJson.isOnInfo,
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/board/main/myboard");
      setBoardList(result.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <MyboardWrapper className="board-wrapper">
      <div className="myboard-container">
        <div className="myboard-title-wrapper">
          <div>
            <h2>즐겨찾는 게시판</h2>
          </div>
          <ShowMore to="/board" />
        </div>
        <div className="myboard-contents-wrapper">
          {isLoading ? (
            <div className="loading-wrapper">
              <ClipLoader color={COLORS.red} loading={isLoading} size={50} />
            </div>
          ) : (
            boardList.map(
              (item) =>
                pinList[getPinName(item.board_category_id)] && (
                  <MyboardItem
                    key={item.id}
                    category={getCategory(item.board_category_id)}
                    title={item.title}
                    content={item.content}
                    categoryNum={item.board_category_id}
                    isNew={isRecentBoard(item.created_at)}
                  />
                )
            )
          )}
        </div>
      </div>
    </MyboardWrapper>
  );
};

export default MyboardList;
