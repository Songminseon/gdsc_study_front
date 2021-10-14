import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

import UnderLine from "@Component/Text/UnderLine";
import BottomNavigaiton from "@Layout/BottomNavigation";
import { formatDate } from "@Hooks/getBoardInfo";
import MessageItem from "./components/MessageItem";
import { COLORS } from "@Component/Colors";

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
  const [isLoading, setIsLoading] = useState(true);
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/message");
      setMessageList(result.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <AlarmWrapper>
      <div className="top-navigation arrange-center">
        <div className="message-category">
          <UnderLine text="쪽지함" isActive={true} />
        </div>
      </div>
      {isLoading ? (
        <div className="arrange-center-center" style={{ marginTop: "150px" }}>
          <ClipLoader color={COLORS.red} loading={isLoading} size={50} />
        </div>
      ) : (
        messageList.map((item) => (
          <MessageItem
            fromNick="익명"
            date={formatDate(item.created_at)}
            content={item.content}
            id={item.to_id}
          />
        ))
      )}
      <div className="bottom-navigation">
        <BottomNavigaiton activeCategory={3} />
      </div>
    </AlarmWrapper>
  );
};

export default Index;
