import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

import xVector from "@Assets/vector/xVector.svg";
import { COLORS } from "@Component/Colors";

const PostWrapper = styled.div`
  textarea::placeholder {
    color: ${COLORS.grey_500};
  }

  .top-navigation {
    height: 48px;
  }

  .close-icon {
    width: 14px;
    height: 14px;
    margin-left: 16px;
    margin-right: 20px;
  }

  .confirm-button {
    color: white;
    background-color: ${COLORS.red};
    padding: 5px 9px;
    font-size: 12px;
    line-height: 12px;
    border-radius: 20px;
    margin-left: auto;
    margin-right: 16px;
  }

  .post-content {
    width: calc(100% - 32px);
    margin: 64px 16px 16px 16px;
    height: auto;
    overflow-x: hidden;
    min-height: 150px;
    max-height: 500px;
    line-height: 1.25;
  }
`;

const Index = () => {
  const history = useHistory();

  const [content, setContent] = useState("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const autoGrow = (e) => {
    e.target.style.height = "21px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const onClickExit = () => {
    history.goBack();
  };

  const writePost = async () => {
    const result = await axios({
      method: "POST",
      url: "/api/message",
      data: {
        content: content,
      },
    });
    if (result) {
      history.push("/message");
    } else {
      alert("server error");
    }
  };

  return (
    <PostWrapper>
      <div className="top-navigation arrange-center">
        <button onClick={onClickExit}>
          <img src={xVector} alt="나가기 버튼" className="close-icon" />
        </button>
        <p>글 쓰기</p>
        <button
          className="confirm-button arrange-center-center"
          onClick={writePost}
        >
          완료
        </button>
      </div>
      <textarea
        className="post-content"
        value={content}
        onChange={onChangeContent}
        placeholder="내용을 입력하세요."
        spellCheck={false}
        onInput={autoGrow}
        wrap="physical"
      />
    </PostWrapper>
  );
};

export default Index;
