import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { COLORS } from "../Colors";
import vectorIcon from "../../assets/vector/vectorRightRed.svg";

const ShowWrapper = styled(Link)`
  display: flex;
  align-items: center;

  span {
    font-size: 12px;
    color: ${COLORS.red};
  }

  .vector {
    width: 10px;
    height: 10px;
    margin-left: 4px;
  }
`;

const ShowMore = ({ to }) => {
  return (
    <ShowWrapper to={to}>
      <span>더 보기</span>
      <img src={vectorIcon} alt="더 보기" className="vector" />
    </ShowWrapper>
  );
};

ShowMore.propTypes = {
  to: PropTypes.string.isRequired,
};

export default ShowMore;
