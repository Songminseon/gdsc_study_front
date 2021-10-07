import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import BottomNavigaiton from "../../layout/BottomNavigation";
import TopGuide from "./components/TopGuide";
import LinkItem from "./components/LinkItem";
import MyboardList from "./components/MyboardList";
import RealTimeBoardList from "./components/RealTimeBoardList";
import HotBoardList from "./components/HotBoardList";
import MainButton from "../../components/Button/MainButton";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 70px;

  .link-list-wrapper {
    margin-top: 12px;
    display: flex;
    justify-content: center;
  }

  .padding {
    width: 100%;
    height: 48px;
  }

  .main-button-wrapper {
    width: 100%;
    margin: 8px 0px;
  }
`;

const Index = () => {
  const history = useHistory();

  const [setting, setSetting] = useState({
    isMine: true,
    isRealTime: true,
    isHot: true,
  });

  const linkItemOption = [
    {
      text: "GDSC 홈",
      to: "https://gdsc.community.dev/seoul-national-university-of-science-and-technology/",
    },
    {
      text: "구글",
      to: "https://google.com",
    },
    {
      text: "학교 홈",
      to: "https://www.seoultech.ac.kr/index.jsp",
    },
    {
      text: "학사 공지",
      to: "https://www.seoultech.ac.kr/life/sch/common/",
    },
  ];

  useEffect(() => {
    const defaultSetting = { isMine: true, isRealTime: true, isHot: true };
    const storage = window.localStorage.getItem("setting");

    if (!storage) {
      // 처음 유저가 접할 때
      window.localStorage.setItem("setting", JSON.stringify(defaultSetting));
    } else {
      const storageJson = JSON.parse(storage);
      setSetting({
        isMine: storageJson.isMine,
        isRealTime: storageJson.isRealTime,
        isHot: storageJson.isHot,
      });
    }
  }, []);

  const onClickSetting = () => {
    history.push("/setting");
  };

  return (
    <MainWrapper>
      <div className="top-navigation">
        <TopGuide />
      </div>
      <div className="link-list-wrapper">
        {linkItemOption.map((item) => (
          <LinkItem text={item.text} to={item.to} />
        ))}
      </div>

      {setting.isMine && <MyboardList />}
      {setting.isRealTime && <RealTimeBoardList />}
      {setting.isHot && <HotBoardList />}

      <div className="bottom-navigation">
        <BottomNavigaiton activeCategory={1} />
      </div>
      <div className="main-button-wrapper">
        <MainButton text="홈 화면 설정" onClick={onClickSetting} />
      </div>
      <div className="padding" />
    </MainWrapper>
  );
};

export default Index;
