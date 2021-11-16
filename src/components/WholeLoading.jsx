import React from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { COLORS } from "./Colors";

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const WholeLoading = () => {
  return (
    <LoadingWrapper className="arrange-center-center">
      <ClipLoader color={"black"} size={100} />
    </LoadingWrapper>
  );
};

export default WholeLoading;
