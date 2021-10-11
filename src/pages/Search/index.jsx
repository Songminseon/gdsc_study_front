import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

import PreviewBoard from "@Layout/PreviewBoard";
import PreviewProfile from "../../layout/PreviewProfile";
import ErrorModal from "../../components/Modal/ErrorModal";

import { COLORS } from "@Component/Colors";
import rightVector from "../../assets/vector/arrow.svg";
import searchIcon from "../../assets/nav/search.svg";

import { formatDate } from "@Hooks/getBoardInfo";
import { customStyles } from "@Component/modalOption";

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
      });

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
            <img src={rightVector} alt="뒤로가기" className="back-button" />
          </button>
          <input
            value={keyword}
            onChange={onChangeKeyword}
            placeholder="글 제목, 내용, 해시태그"
            onKeyPress={onKeyPress}
          />
          <button onClick={onClickSearch}>
            <img src={searchIcon} alt="검색어 초기화" />
          </button>
        </div>
      </div>
      <div className="result-container">
        {isGuideOn ? (
          <div className="arrange-center-center guide-wrapper">
            <img
              src={searchIcon}
              alt="검색가이드"
              className="search-icon arrange-center-center"
            />
            <p className="result-text">전체 게시판의 글을 검색해보세요</p>
          </div>
        ) : resultList.length === 0 ? (
          <p className="no-result">일치하는 게시물이 없습니다.</p>
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
        contentLabel="검색 결과 조건 부족"
        ariaHideApp={false}
        style={customStyles}
      >
        <ErrorModal
          text="검색어는 최소 2글자 이상 입력해주세요."
          onClick={() => setIsOpen(false)}
        />
      </Modal>
    </SearchWrapper>
  );
};

export default Index;
