import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { COLORS } from "@Component/Colors";

const ItemWrapper = styled.div`
  border-bottom: 1px solid ${COLORS.grey_400};
  padding: 12px 0px;

  .message-top-wrapper {
    margin: 0px 16px;
    justify-content: space-between;

    .message-nick {
      font-weight: 700;
      font-size: 14px;
      color: ${(props) => (props.isFrom ? COLORS.green : "yellow")};
    }

    .message-date {
      font-weight: 400;
      color: ${COLORS.grey_500};
      font-size: 11px;
    }
  }

  .message-contents {
    display: inline-block;
    font-size: 12px;
    margin: 9px 16px 0px 16px;
    font-weight: 400;
    line-height: 1.35;
  }
`;

const MessageDetailItem = ({ isFrom, date, contents }) => {
  const categoryText = isFrom ? "받은 쪽지" : "보낸 쪽지";

  return (
    <ItemWrapper isFrom={isFrom}>
      <div className="message-top-wrapper arrange-center">
        <p className="message-nick">{categoryText}</p>
        <p className="message-date">{date}</p>
      </div>
      <p className="message-contents">{contents}</p>
    </ItemWrapper>
  );
};

MessageDetailItem.propTypes = {
  isFrom: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
};

export default MessageDetailItem;
