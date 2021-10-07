import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import newIcon from "../../../assets/icon/new.svg";
import { COLORS } from "../../../components/Colors";

const ItemWrapper = styled(Link)`
  display: flex;
  align-items: center;
  height: 12px;
  margin-top: 12px;

  .category-text {
    font-weight: 400;
    font-size: 12px;
  }

  .title-text {
    text-align: left;
    color: ${COLORS.grey_text};
    font-weight: 400;
    font-size: 12px;
    margin-left: 12px;
  }

  .new-icon {
    width: 12px;
    height: 12px;
    margin-left: auto;
  }
`;

const MyboardItem = ({ category, title, isNew, categoryNum }) => {
  const linkUrl = `/board/list/${categoryNum}`;

  return (
    <ItemWrapper to={linkUrl}>
      <p className="category-text">{category}</p>
      <p className="title-text">{title}</p>
      {isNew && <img src={newIcon} alt="새로운 게시물" className="new-icon" />}
    </ItemWrapper>
  );
};

MyboardItem.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
};

export default MyboardItem;
