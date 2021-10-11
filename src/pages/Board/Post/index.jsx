import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { COLORS } from "../../../components/Colors";
import xVector from "../../../assets/vector/xVector.svg";
import cameraIcon from "../../../assets/icon/camera.svg";
import checkIcon from "../../../assets/vector/checked.svg";

const PostWrapper = styled.div`
  padding-top: 48px;

  textarea::placeholder {
    color: ${COLORS.grey_500};
  }

  .top-navigation {
    height: 48px;
  }

  .photo-icon {
    width: 16px;
    height: 20px;
    margin-left: 16px;
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
    padding: 5px 8px;
    font-size: 12px;
    line-height: 12px;
    line-height: 12px;
    border-radius: 20px;
    margin-left: auto;
    margin-right: 16px;
  }

  .post-contents {
    width: calc(100% - 32px);
    margin: 16px;
    height: auto;
    overflow-x: hidden;
    min-height: 150px;
    max-height: 500px;
    line-height: 1.25;
  }

  .bottom-sub-navigation {
    width: 100%;
    max-width: 500px;
    bottom: 0px;
    height: 30px;
    position: fixed;
    justify-content: space-between;

    .user-option-wrapper {
      margin-right: 16px;
    }
  }

  input[type="checkbox"] {
    display: inline-block;
    position: relative;
    width: 10px;
    height: 10px;
    background: url(${checkIcon});
    background-size: contain;
  }

  input[type="checkbox"]:checked {
    width: 10px;
    height: 10px;
    background: url(${checkIcon});
    background-size: contain;
  }

  .secret-label {
    font-size: 12px;
    line-height: 12px;
    margin-left: 2px;
    color: ${(props) => (props.isSecret ? COLORS.red : COLORS.grey_500)};
  }
`;

const Index = () => {
  const history = useHistory();

  const [imgUrl, setImgUrl] = useState("");
  const [isSecret, setIsSecret] = useState(false);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => setImgUrl(reader.result));
    }
  };

  const onChangeSecret = (e) => {
    if (e.target.checked) {
      setIsSecret(true);
    } else {
      setIsSecret(false);
    }
  };

  const autoGrow = (e) => {
    e.target.style.height = "21px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const onClickExit = () => {
    history.goBack();
  };

  const writePost = () => {
    alert("글 작성 완료");
  };

  return (
    <PostWrapper isSecret={isSecret}>
      <div className="top-navigation arrange-center">
        <button onClick={onClickExit}>
          <img
            src={xVector}
            alt="나가기 버튼"
            className="close-icon"
            onSelect={onSelectFile}
          />
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
        className="post-contents"
        placeholder="내용을 입력하세요."
        spellCheck={false}
        onInput={autoGrow}
        wrap="physical"
      />
      <div className="bottom-sub-navigation arrange-center">
        <input
          type="file"
          id="upload_photo"
          style={{ display: "none" }}
          accept="image/*"
        />
        <label htmlFor="upload_photo">
          <img src={cameraIcon} alt="사진 추가" className="photo-icon" />
        </label>
        <div className="user-option-wrapper">
          <input
            type="checkbox"
            id="isSecret"
            checked={isSecret}
            onChange={onChangeSecret}
            className="secret-input"
          />
          <label htmlFor="isSecret" className="secret-label">
            익명
          </label>
        </div>
      </div>
    </PostWrapper>
  );
};

export default Index;
