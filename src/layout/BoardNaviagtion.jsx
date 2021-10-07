import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { COLORS } from "../components/Colors";
import backIcon from "../assets/vector/arrow.svg";
import searchIcon from "../assets/nav/search.svg";

const NavigationWrapper = styled.div`
  height: 48px;
  justify-content: space-between;

  .left-side {
    margin-left: 24px;

    .back-button {
      width: 24px;
      height: 24px;
      transform: rotate(180deg);
    }

    .text-wrapper {
      margin-left: 24px;
    }

    h4 {
      font-size: 12px;
    }

    h5 {
      margin-top: 2px;
      font-weight: 400;
      color: ${COLORS.grey_500};
      font-size: 12px;
    }
  }

  .right-side {
    width: 24px;
    height: 24px;
    margin-right: 16px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const BoardNavigation = ({ title }) => {
  const history = useHistory();

  const onClickBack = () => {
    history.goBack();
  };

  const onClickSearch = () => {
    history.push("/search");
  };

  return (
    <NavigationWrapper className="arrange-center">
      <div className="arrange-center left-side">
        <button className="back-button" onClick={onClickBack}>
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <div className="text-wrapper">
          <h4>{title}</h4>
          <h5>GDSC</h5>
        </div>
      </div>
      <button className="right-side" onClick={onClickSearch}>
        <img src={searchIcon} alt="검색 아이콘" />
      </button>
    </NavigationWrapper>
  );
};

export default BoardNavigation;
