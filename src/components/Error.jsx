import React from "react";
import styled from "styled-components";

const CustomError = styled.p`
  width: 100%;
  font-size: 10px;
  color: red;
`;

const Error = ({ errorNum }) => {
  const getErrorText = () => {
    switch (errorNum) {
      case 1:
        return "비밀번호 조건이 충족되지 않습니다.";
      case 2:
        return "비밀번호와 일치하지 않습니다.";
      case 3:
        return "아이디가 적절하지 않습니다.";
      default:
        return "invalid Error";
    }
  };

  return <CustomError>{getErrorText()}</CustomError>;
};

export default Error;
