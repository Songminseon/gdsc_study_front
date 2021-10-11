import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

import { COLORS } from "../../../components/Colors";
import xVector from "../../../assets/vector/xVector.svg";
import cameraIcon from "../../../assets//icon/camera.svg";
import checkIcon from "../../../assets//vector/checked.svg";
import ErrorModal from "../../../components/Modal/ErrorModal";
import { customStyles } from "../../../components/modalOption";

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

  .post-title {
    width: calc(100% - 32px);
    padding: 16px 0px;
    margin: 0px 16px;
    border-bottom: 1px solid ${COLORS.grey_500};
    font-size: 18px;

    &::placeholder {
      font-weight: 700;
      font-size: 18px;
      color: ${COLORS.grey_500};
    }
  }

  .post-content {
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
    border: 1px solid ${COLORS.grey_500};
    border-radius: 10px;
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

const Index = ({ match }) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [isSecret, setIsSecret] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

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
    const categoryId = match.params.id;

    if (!categoryId || categoryId === "7") {
      setIsOpen(true);
      setErrorText("비정상적인 접근입니다.");
    } else {
      if (!title) {
        setIsOpen(true);
        setErrorText("제목을 채워주세요.");
      } else if (!content) {
        setIsOpen(true);
        setErrorText("내용을 채워주세요.");
      } else {
        const result = await axios({
          method: "POST",
          url: "/api/board",
          data: {
            category_id: categoryId,
            title: title,
            content: content,
            is_secret: isSecret,
          },
        });
        if (result) {
          history.replace(`/board/list/${categoryId}`);
        } else {
          alert("server error");
        }
      }
    }
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
      <input
        className="post-title"
        type="text"
        value={title}
        onChange={onChangeTitle}
        placeholder="제목"
      />
      <textarea
        className="post-content"
        value={content}
        onChange={onChangeContent}
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
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="글작성 에러"
        ariaHideApp={false}
        style={customStyles}
      >
        <ErrorModal text={errorText} onClick={() => setIsOpen(false)} />
      </Modal>
    </PostWrapper>
  );
};

export default Index;
