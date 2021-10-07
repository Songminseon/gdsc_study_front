import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { COLORS } from "../../../components/Colors";

const ItemWrapper = styled(Link)`
  cursor: pointer;
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid ${COLORS.grey_400};
  padding: 12px 0px;

  .message-top-wrapper {
    margin: 0px 16px;
    justify-content: space-between;

    .message-nick {
      font-weight: 700;
      font-size: 14px;
    }

    .message-date {
      font-weight: 400;
      color: ${COLORS.grey_500};
      font-size: 11px;
    }
  }

  .message-title {
    display: inline-block;
    font-size: 12px;
    margin: 0px 16px;
    font-weight: 400;
  }
`;

const MessageItem = ({ fromNick, date, title, id }) => {
  const detailUrl = `/message/${id}`;

  return (
    <ItemWrapper to={detailUrl}>
      <div className="message-top-wrapper arrange-center">
        <p className="message-nick">{fromNick}</p>
        <p className="message-date">{date}</p>
      </div>
      <p className="message-title">{title}</p>
    </ItemWrapper>
  );
};

MessageItem.propTypes = {
  fromNick: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MessageItem;
