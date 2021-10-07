import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLORS } from "../../../components/Colors";
import mypageLogo from "../../../assets/nav/mypage.svg";
import searchLogo from "../../../assets/nav/search.svg";

const GuideWrapper = styled.div`
  padding: 16px;
  background-color: white;

  .everytime-text {
    color: ${COLORS.red};
    font-size: 10px;
  }

  .guide-contents-container {
    margin-top: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 16px;
      font-weight: 700;
    }

    .icon-wrapper {
      height: 20px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .mypage-icon {
      margin-left: 16px;
    }
  }
`;

const TopGuide = () => {
  return (
    <GuideWrapper>
      <p className="everytime-text">에브리타임</p>
      <div className="guide-contents-container">
        <h2>GDSC 웹</h2>
        <div className="icon-wrapper">
          <Link to="/search">
            <img src={searchLogo} alt="검색 아이콘" />
          </Link>
          <Link to="/mypage" className="mypage-icon">
            <img src={mypageLogo} alt="마이페에지 아이콘" />
          </Link>
        </div>
      </div>
    </GuideWrapper>
  );
};

export default TopGuide;
