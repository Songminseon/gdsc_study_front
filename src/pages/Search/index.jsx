import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

import PreviewBoard from "../../layout/PreviewBoard";
import PreviewProfile from "../../layout/PreviewProfile";
import ErrorModal from "../../components/Modal/ErrorModal";

import { COLORS } from "../../components/Colors";
import rightVector from "../../assets/vector/arrow.svg";
import searchIcon from "../../assets/nav/search.svg";

import { formatDate } from "../../hooks/getBoardInfo";
import { customStyles } from "../../components/modalOption";

const SearchWrapper = styled.div`
  padding-top: 72px;
  height: calc(100% - 72px);

  .top-navigation {
    height: 72px;
  }

  .no-result {
    color: ${COLORS.grey_600};
    font-weight: 700;
    text-align: center;
    margin-top: 32px;
  }

  .guide-wrapper {
    flex-wrap: wrap;
    margin-top: 32px;
  }

  .search-top-wrapper {
    width: auto;
    height: 40px;
    margin: 16px 8px;
    border-radius: 10px;
    background-color: ${COLORS.grey_300};
    display: flex;
    justify-content: space-between;

    input {
      width: 100%;
      margin: 0px;
    }

    input::placeholder {
      font-size: 14px;
      font-weight: 400;
    }

    button img {
      width: 14px;
      height: 14px;
      margin: 12px;
    }

    .back-button {
      transform: rotate(180deg);
    }
  }

  .result-container {
    width: 100%;
    height: 100%;
  }

  .result-text {
    font-weight: 16px;
    font-weight: 700;
    color: ${COLORS.grey_500};
    display: inline-block;
    text-align: center;
    width: 100%;
    margin-top: 16px;
  }

  .search-icon {
    margin: auto;
  }

  .board-result-wrapper {
    border-bottom: 1px solid ${COLORS.grey_400};
    padding: 8px 16px;
  }
`;

const Index = () => {
  const history = useHistory();

  const [keyword, setKeyword] = useState("");
  const [isGuideOn, setIsGuideOn] = useState(true);
  const [resultList, setResultList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClickBack = () => {
    history.goBack();
  };

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const onClickSearch = async () => {
    if (keyword.length < 2) {
      setIsOpen(true);
    } else {
      setIsGuideOn(false);
      const result = await axios({
        method: "POST",
        url: "/api/board/search",
        data: {
          word: keyword,
        },
      }).catch((err) => alert(err));

      if (result) {
        setResultList(result.data.data);
      } else {
        alert("Server error");
      }
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <SearchWrapper>
      <div className="top-navigation">
        <div className="search-top-wrapper">
          <button onClick={onClickBack}>
            <img src={rightVector} alt="????????????" className="back-button" />
          </button>
          <input
            value={keyword}
            onChange={onChangeKeyword}
            placeholder="??? ??????, ??????, ????????????"
            onKeyPress={onKeyPress}
          />
          <button onClick={onClickSearch}>
            <img src={searchIcon} alt="????????? ?????????" />
          </button>
        </div>
      </div>
      <div className="result-container">
        {isGuideOn ? (
          <div className="arrange-center-center guide-wrapper">
            <img src={searchIcon} alt="???????????????" className="search-icon arrange-center-center" />
            <p className="result-text">?????? ???????????? ?????? ??????????????????</p>
          </div>
        ) : resultList.length === 0 ? (
          <p className="no-result">???????????? ???????????? ????????????.</p>
        ) : (
          resultList.map((item) => (
            <div className="board-result-wrapper">
              <PreviewProfile
                profileUrl={item.User.profile_pic}
                nick={item.User.nickname}
                date={formatDate(item.created_at)}
              />
              <PreviewBoard
                boardId={item.id}
                title={item.title}
                content={item.content}
                like={item.like_num}
                comment={item.comment_num}
              />
            </div>
          ))
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="?????? ?????? ?????? ??????"
        ariaHideApp={false}
        style={customStyles}
      >
        <ErrorModal
          text="???????????? ?????? 2?????? ?????? ??????????????????."
          onClick={() => setIsOpen(false)}
        />
      </Modal>
    </SearchWrapper>
  );
};

export default Index;
