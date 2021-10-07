import React from "react";
import styled from "styled-components";
import { dummyDetailMessage } from "../../components/dummyData";

import ActionBar from "../../layout/ActionBar";
import MessageDetailItem from "./components/MessageDetailItem";

const MessageWrapper = styled.div``;

const Index = () => {
  const messageList = dummyDetailMessage;

  return (
    <MessageWrapper>
      <ActionBar title="익명" />
      {messageList.map((item) => (
        <MessageDetailItem
          isFrom={item.isFrom}
          date={item.date}
          contents={item.contents}
        />
      ))}
    </MessageWrapper>
  );
};

export default Index;
