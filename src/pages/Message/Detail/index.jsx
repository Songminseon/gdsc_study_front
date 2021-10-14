import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import { formatDate } from "@Hooks/getBoardInfo";
import MessageDetailItem from "./components/MessageDetailItem";
import MessageBar from "./components/MessageBar";
import MessagePost from "../../Message/Post";
import { COLORS } from "@Component/Colors";

const MessageWrapper = styled.div`
  height: 100%;

  .message-detail-wrapper {
    display: inline-block;
    width: 100%;
    margin-top: 48px;
  }
`;

const Index = ({ match }) => {
  const [messageList, setMessageList] = useState([]);
  const [isMessageOn, setIsMessageOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toId = match.params.id;

  const onClickSend = () => {
    setIsMessageOn(true);
  };

  const closeMessage = () => {
    setIsMessageOn(false);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/message/detail/${match.params.id}`);
      setMessageList(result.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {isMessageOn ? (
        <MessagePost toId={toId} closeMessage={closeMessage} />
      ) : (
        <MessageWrapper>
          <div className="top-navigation">
            <MessageBar onClickSend={onClickSend} toId={toId} />
          </div>
          {isLoading ? (
            <div
              className="arrange-center-center"
              style={{ marginTop: "250px" }}
            >
              <ClipLoader color={COLORS.red} loading={isLoading} size={50} />
            </div>
          ) : (
            <div className="message-detail-wrapper">
              {messageList.map((item) => (
                <MessageDetailItem
                  isFrom={item.to_id !== parseInt(match.params.id)}
                  date={formatDate(item.created_at)}
                  content={item.content}
                />
              ))}
            </div>
          )}
        </MessageWrapper>
      )}
    </div>
  );
};

export default Index;
