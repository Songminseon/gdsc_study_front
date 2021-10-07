import React from "react";
import styled from "styled-components";
import PinnedItem from "./PinnedItem";

const SliderWrapper = styled.div`
  .board-margin {
    margin: 12px 8px 0px 8px;
  }
`;

const SliderBoard = ({ boardPin, setBoardPin }) => {
  const pinList = [
    {
      category: "isOnF",
      title: "자유게시판",
      isOn: boardPin.isOnF,
      to: "/board/list/1",
    },
    {
      category: "isOnS",
      title: "비밀게시판",
      isOn: boardPin.isOnS,
      to: "/board/list/2",
    },
    {
      category: "isOnG",
      title: "졸업생게시판",
      isOn: boardPin.isOnG,
      to: "/board/list/3",
    },
    {
      category: "isOnN",
      title: "새내기게시판",
      isOn: boardPin.isOnN,
      to: "/board/list/4",
    },
    {
      category: "isOnI",
      title: "시사이슈",
      isOn: boardPin.isOnI,
      to: "/board/list/5",
    },
    {
      category: "isOnInfo",
      title: "정보게시판",
      isOn: boardPin.isOnInfo,
      to: "/board/list/6",
    },
  ];

  const onClickPin = (category) => {
    const storage = JSON.parse(window.localStorage.getItem("board_pin"));
    const isPinOn = storage[category];
    if (isPinOn) {
      const newObj = { ...boardPin, [category]: false };
      window.localStorage.setItem("board_pin", JSON.stringify(newObj));
      setBoardPin(newObj);
    } else {
      const newObj = { ...boardPin, [category]: true };
      window.localStorage.setItem("board_pin", JSON.stringify(newObj));
      setBoardPin(newObj);
    }
  };

  return (
    <SliderWrapper>
      <div className="board-wrapper board-margin">
        {pinList.map((item) => (
          <PinnedItem
            title={item.title}
            isOn={item.isOn}
            category={item.category}
            to={item.to}
            onClickPin={() => onClickPin(item.category)}
          />
        ))}
      </div>
    </SliderWrapper>
  );
};

export default SliderBoard;
