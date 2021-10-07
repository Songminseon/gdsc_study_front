import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import pinOn from "../../../../assets/icon/pinOn.svg";
import pinOff from "../../../../assets/icon/pinOff.svg";

const PinButton = styled.button`
  height: 32px;

  .pin-img {
    width: 16px;
    height: 16px;
    margin-left: 12px;
    margin-right: 16px;
  }

  a {
    font-size: 14px;
  }

  .new-icon {
    width: 12px;
    height: 12px;
    margin-left: 6px;
  }
`;

const PinnedItem = ({ title, isOn, onClickPin, to }) => {
  const pinIcon = isOn ? pinOn : pinOff;

  return (
    <PinButton className="arrange-center">
      <button onClick={onClickPin}>
        <img src={pinIcon} alt="핀 아이콘" className="pin-img" />
      </button>
      <Link to={to}>{title}</Link>
    </PinButton>
  );
};

export default PinnedItem;
