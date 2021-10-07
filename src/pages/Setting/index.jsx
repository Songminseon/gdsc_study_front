import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TopNavigation from "../../layout/TopNavigation";
import checkIcon from "../../assets/vector/checked.svg";
import { COLORS } from "../../components/Colors";

const SettingWrapper = styled.div`
  input[type="checkbox"] {
    display: inline-block;
    position: relative;
    width: 10px;
    height: 10px;
    background-color: white;
    border: 1px solid ${COLORS.grey_400};
    border-radius: 100%;
  }

  input[type="checkbox"]:checked {
    width: 12px;
    height: 12px;
    background: url(${checkIcon});
    background-size: contain;
    border: none;
  }

  label {
    margin-left: 24px;
    font-weight: 400;
    font-size: 14px;
  }

  .board-wrapper {
    margin: 0px 8px;
    padding-bottom: 16px;
  }

  .option-wrapper {
    margin: 16px 12px 0px 12px;
  }
`;

const Setting = () => {
  const [setting, setSetting] = useState({
    isMine: false,
    isRealTime: false,
    isHot: false,
  });

  useEffect(() => {
    const storageJson = JSON.parse(window.localStorage.getItem("setting"));
    setSetting({
      isMine: storageJson.isMine,
      isRealTime: storageJson.isRealTime,
      isHot: storageJson.isHot,
    });
  }, []);

  const onChangeCheck = (e) => {
    if (e.target.checked) {
      // true가 되면
      const newObj = { ...setting, [e.target.name]: true };
      window.localStorage.setItem("setting", JSON.stringify(newObj));
      setSetting(newObj);
    } else {
      const newObj = { ...setting, [e.target.name]: false };
      window.localStorage.setItem("setting", JSON.stringify(newObj));
      setSetting(newObj);
    }
  };

  return (
    <SettingWrapper>
      <TopNavigation title="홈 화면 설정" />
      <div className="board-wrapper">
        <div className="option-wrapper">
          <input
            type="checkbox"
            name="isMine"
            id="isMine"
            checked={setting.isMine}
            onChange={onChangeCheck}
          />
          <label htmlFor="isMine">즐겨찾는 게시판</label>
        </div>
        <div className="option-wrapper">
          <input
            type="checkbox"
            name="isRealTime"
            id="isRealTime"
            checked={setting.isRealTime}
            onChange={onChangeCheck}
          />
          <label htmlFor="isRealTime">실시간 인기글</label>
        </div>
        <div className="option-wrapper">
          <input
            type="checkbox"
            name="isHot"
            id="isHot"
            checked={setting.isHot}
            onChange={onChangeCheck}
          />
          <label htmlFor="isHot">HOT 게시물</label>
        </div>
      </div>
    </SettingWrapper>
  );
};

export default Setting;
