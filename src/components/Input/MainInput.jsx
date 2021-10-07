import React from "react";
import styled from "styled-components";

import { COLORS } from "../Colors";

const CustomInput = styled.input`
  width: calc(100% - 32px);
  height: 32px;
  background: ${COLORS.grey_300};
  border-radius: 10px;
  padding: 0px 16px;
  font-size: 14px;

  &::placeholder {
    color: ${COLORS.grey_500};
    font-weight: 400;
    font-size: 14px;
  }
`;

const MainInput = ({ value, type, onChange, handleFocus, placeholder }) => {
  return (
    <CustomInput
      value={value}
      type={type}
      onChange={onChange}
      onBlur={handleFocus}
      onFocus={handleFocus}
      placeholder={placeholder}
      spellCheck={false}
    />
  );
};

export default MainInput;
