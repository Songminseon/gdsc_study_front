import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import tempProfile from "../assets/img/temp.png";
import { COLORS } from "../components/Colors";

const ProfileWrapper = styled.div`
  .user-info-area {
    display: flex;
    align-items: center;
    height: 24px;

    .profile-img {
      width: 16px;
      height: 16px;
    }
    .nick-text {
      font-size: 12px;
      margin-left: 8px;
    }
    .date-area {
      font-size: 12px;
      color: ${COLORS.grey_text};
      margin-left: auto;
      font-weight: 400;
    }
  }
`;

const PreviewProfile = ({ profileUrl, nick, date }) => {
  const profileImg = profileUrl ? profileUrl : tempProfile;

  return (
    <ProfileWrapper>
      <div className="user-info-area">
        <img src={profileImg} alt="임시 프로필" className="profile-img" />
        <p className="nick-text">{nick}</p>
        <p className="date-area">{date}</p>
      </div>
    </ProfileWrapper>
  );
};

PreviewProfile.propTypes = {
  profileUrl: PropTypes.string,
  nick: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default PreviewProfile;
