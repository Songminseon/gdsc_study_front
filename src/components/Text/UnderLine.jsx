import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLORS } from "../Colors";

const LineText = styled.h2`
  font-size: 20px;
  font-weight: 700;
  text-decoration: ${(props) => (props.isActive ? "underline" : "none")};
  color: ${(props) => (props.isActive ? COLORS.black : COLORS.grey_400)};
`;

const UnderLine = ({ text, isActive }) => {
  return <LineText isActive={isActive}>{text}</LineText>;
};

UnderLine.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default UnderLine;
