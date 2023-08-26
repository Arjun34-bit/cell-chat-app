import React, { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const [time, setTime] = useState("");
  const { user } = ChatState();

  const timeCode = (timestamp) => {
    // const splitTime = timestamp.split(".");
    // const time = splitTime[0].split("T");
    // const fTime = time[1].slice(0, 5);
    // return fTime;

    const utcTime = new Date(timestamp); // Adjust the date and time as needed

    utcTime.setTime(
      utcTime.getTime() + utcTime.getTimezoneOffset() * 60 * 1000
    );

    const timeDifference = 5.5 * 60 * 60 * 1000; // 5 hours and 30 minutes in milliseconds

    const istTime = new Date(utcTime.getTime() + timeDifference);

    const formattedIstTime = istTime.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    return formattedIstTime;
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {m.content}
              <sub paddingLeft={"2px"}>{timeCode(m.createdAt)}</sub>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
