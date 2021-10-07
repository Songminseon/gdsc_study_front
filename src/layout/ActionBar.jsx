import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import rightVector from "../assets/vector/vectorRight.svg";

const BarWrapper = styled.div`
  width: 100%;
  height: 48px;
  position: relative;

  .back-button {
    position: absolute;
    width: 16px;
    height: 16px;
    left: 6px;
  }

  .reverse {
    transform: rotate(180deg);
  }

  .action-title {
    display: inline-block;
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
  }
`;

const ActionBar = ({ title }) => {
  const history = useHistory();

  const onClickBack = () => {
    history.goBack();
  };

  return (
    <BarWrapper className="arrange-center">
      <button onClick={onClickBack} className="back-button">
        <img src={rightVector} alt="뒤로 가기" className="reverse" />
      </button>
      <h1 className="action-title">{title}</h1>
    </BarWrapper>
  );
};

ActionBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ActionBar;
