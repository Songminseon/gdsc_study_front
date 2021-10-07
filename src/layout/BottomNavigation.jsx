import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import bellAcitve from "../assets/nav/bellActive.png";
import bellDisable from "../assets/nav/bellDisable.png";
import boardActive from "../assets/nav/boardActive.png";
import boardDisable from "../assets/nav/boardDisable.png";
import homeActive from "../assets/nav/homeActive.svg";
import homeDisable from "../assets/nav/homeDisable.svg";
import { COLORS } from "../components/Colors";

const NavigationWrapper = styled.div`
  display: flex;
  height: 48px;
  border-top: 1px solid ${COLORS.grey_light};
  background: white;

  .icon-container {
    width: 100%;
    height: 100%;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;

const BottomNavigaiton = ({ activeCategory }) => {
  const homeIcon = activeCategory === 1 ? homeActive : homeDisable;
  const boardIcon = activeCategory === 2 ? boardActive : boardDisable;
  const bellIcon = activeCategory === 3 ? bellAcitve : bellDisable;

  return (
    <NavigationWrapper>
      <Link className="icon-container arrange-center-center" to="/">
        <img src={homeIcon} alt="홈 아이콘" />
      </Link>
      <Link className="icon-container arrange-center-center" to="/board">
        <img src={boardIcon} alt="게시판 아이콘" />
      </Link>
      <Link className="icon-container arrange-center-center" to="/message">
        <img src={bellIcon} alt="알림 아이콘" />
      </Link>
    </NavigationWrapper>
  );
};

BottomNavigaiton.propTypes = {
  activeCategory: PropTypes.number.isRequired,
};

export default BottomNavigaiton;
