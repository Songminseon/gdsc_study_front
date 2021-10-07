import React from "react";
import styled from "styled-components";
import UnderLine from "../../components/Text/UnderLine";
import BottomNavigaiton from "../../layout/BottomNavigation";

import { dummyMessage } from "../../components/dummyData";
import MessageItem from "./components/MessageItem";

const AlarmWrapper = styled.div`
  padding-top: 48px;

  h2 {
    margin-left: 16px;
  }

  .top-navigation {
    height: 48px;
  }
`;

const Index = () => {
  const messageList = dummyMessage;

  return (
    <AlarmWrapper>
      <div className="top-navigation arrange-center">
        <div className="message-category">
          <UnderLine text="쪽지함" isActive={true} />
        </div>
      </div>
      {messageList.map((item) => (
        <MessageItem
          fromNick={item.nick}
          date={item.date}
          title={item.title}
          id={item.id}
        />
      ))}
      <div className="bottom-navigation">
        <BottomNavigaiton activeCategory={3} />
      </div>
    </AlarmWrapper>
  );
};

export default Index;
