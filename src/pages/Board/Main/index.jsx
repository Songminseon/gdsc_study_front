import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
// import WritePost from "../../../components/Button/WritePost";
import UnderLine from "../../../components/Text/UnderLine";
import BottomNavigaiton from "../../../layout/BottomNavigation";
import SliderBoard from "./components/SliderBoard";
import SliderCareer from "./components/SliderCareer";
import SliderPromotion from "./components/SliderPromotion";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const BoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;

  .slider-wrapper {
    width: 100%;
    height: calc(100% - 96px);
    margin-top: 48px;

    .slider-item {
      width: 100%;
      height: 100%;
    }
  }

  .top-navigation {
    height: 48px;
  }

  .slick-list {
    height: 100%;
    max-height: 100%;
  }

  h2 {
    margin-left: 16px;
  }
`;

const Index = () => {
  const [sliderId, setSliderId] = useState(0);
  const [boardPin, setBoardPin] = useState({
    isOnF: true,
    isOnS: true,
    isOnG: true,
    isOnN: true,
    isOnI: true,
    isOnInfo: true,
  });

  const mySlider = useRef();

  const settings = {
    className: "slider-wrapper",
    dots: false,
    infinite: false,
    slideToShow: 1,
    slideToScroll: 1,
    afterChange: (index) => setSliderId(index),
    ref: mySlider,
  };

  const moveSlider = (index) => {
    setSliderId(index);
    mySlider.current.slickGoTo(index);
  };

  useEffect(() => {
    const defaultSetting = {
      isOnF: true,
      isOnS: true,
      isOnG: true,
      isOnN: true,
      isOnI: true,
      isOnInfo: true,
    };
    const storage = window.localStorage.getItem("board_pin");

    if (!storage) {
      // 처음 유저가 접할 때
      window.localStorage.setItem("board_pin", JSON.stringify(defaultSetting));
    } else {
      const storageJson = JSON.parse(storage);
      setBoardPin({
        isOnF: storageJson.isOnF,
        isOnS: storageJson.isOnS,
        isOnG: storageJson.isOnG,
        isOnN: storageJson.isOnN,
        isOnI: storageJson.isOnI,
        isOnInfo: storageJson.isOnInfo,
      });
    }
  }, []);

  return (
    <BoardWrapper>
      <div className="top-navigation arrange-center">
        <button onClick={() => moveSlider(0)}>
          <UnderLine text="게시판" isActive={sliderId === 0} />
        </button>
        <button onClick={() => moveSlider(1)}>
          <UnderLine text="진로" isActive={sliderId === 1} />
        </button>
        <button onClick={() => moveSlider(2)}>
          <UnderLine text="홍보" isActive={sliderId === 2} />
        </button>
      </div>

      <Slider {...settings} edgeFriction={0}>
        <div className="slider-item">
          <SliderBoard boardPin={boardPin} setBoardPin={setBoardPin} />
        </div>
        <div className="slider-item">
          <SliderCareer />
        </div>
        <div className="slider-item">
          <SliderPromotion />
        </div>
      </Slider>

      <div className="bottom-navigation">
        <BottomNavigaiton activeCategory={2} />
      </div>
    </BoardWrapper>
  );
};

export default Index;
