import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import arrowIcon from "../assets/vector/arrow.svg";

const TopWrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;

  h2 {
    margin-left: 24px;
  }

  .back-button {
    width: 24px;
    height: 24px;
    margin-left: 16px;
    transform: rotate(180deg);
  }
`;

const TopNavigation = ({ title }) => {
  const history = useHistory();

  const onClickBack = () => {
    history.goBack();
  };

  return (
    <TopWrapper>
      <button onClick={onClickBack}>
        <img src={arrowIcon} alt="뒤로가기" className="back-button" />
      </button>
      <h2>{title}</h2>
    </TopWrapper>
  );
};

export default TopNavigation;
