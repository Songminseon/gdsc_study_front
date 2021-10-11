import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLORS } from "@Component/Colors";

const ErrorWrapper = styled.div`
  width: 100%;
  height: 100%;

  .error-text-wrapper {
    text-align: center;
    strong {
      display: inline-block;
      width: 100%;
      font-size: 32px;
      font-weight: 700;
      color: ${COLORS.grey_500};
    }

    a {
      font-size: 18px;
    }
  }
`;

const Index = () => {
  return (
    <ErrorWrapper className="arrange-center-center">
      <div className="error-text-wrapper">
        <strong>404 Not Found</strong>
        <Link to="/">메인페이지로 돌아가기</Link>
      </div>
    </ErrorWrapper>
  );
};

export default Index;
