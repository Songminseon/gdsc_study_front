import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import googleIcon from "../../../assets/icon/google.svg";
import googleBlackIcon from "../../../assets/icon/google_black.svg";
import noticeIcon from "../../../assets/icon/notice.svg";
import schoolIcon from "../../../assets/icon/school.svg";

import { COLORS } from "../../../components/Colors";

const ItemContainer = styled.a`
  width: 40px;
  margin: 0px 8px;

  .link-item-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: ${COLORS.grey_light};

    img {
      width: 20px;
      height: 20px;
      margin: 10px;
    }
  }

  .link-item-text {
    font-weight: 400;
    margin-top: 6px;
    font-size: 10px;
    text-align: center;
    word-break: break-word;
  }
`;

const LinkItem = ({ text, to }) => {
  const getImg = () => {
    switch (text) {
      case "GDSC 홈":
        return googleIcon;
      case "구글":
        return googleBlackIcon;
      case "학교 홈":
        return schoolIcon;
      case "학사 공지":
        return noticeIcon;
      default:
        return googleIcon;
    }
  };

  return (
    <ItemContainer href={to}>
      <div className="link-item-icon-wrapper">
        <img src={getImg()} alt={text} />
      </div>
      <p className="link-item-text">{text}</p>
    </ItemContainer>
  );
};

LinkItem.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default LinkItem;
