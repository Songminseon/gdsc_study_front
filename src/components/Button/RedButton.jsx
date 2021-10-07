import React from "react";
import styled from "styled-components";

import { COLORS } from "../Colors";

const CustomButton = styled.button`
  width: 100%;
  height: 32px;
  background-color: ${COLORS.red};
  border-radius: 10px;
  color: white;
  font-size: 14px;
`;

const RedButton = ({ text, onClick }) => {
  return (
    <CustomButton onClick={onClick} className="arrange-center-center">
      {text}
    </CustomButton>
  );
};

export default RedButton;
