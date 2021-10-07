import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import xVector from "../assets/vector/xVector.svg";

const BarWrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .infobar-text {
    font-size: 14px;
    margin-left: 16px;
  }
  .infobar-button {
    img {
      width: 14px;
      height: 14px;
      margin-right: 16px;
    }
  }
`;

const InfoBar = ({ text }) => {
  const history = useHistory();
  const onClickBack = () => {
    history.goBack();
  };

  return (
    <BarWrapper>
      <p className="infobar-text">{text}</p>
      <button className="infobar-button" onClick={onClickBack}>
        <img src={xVector} alt="뒤로가기" />
      </button>
    </BarWrapper>
  );
};

export default InfoBar;
