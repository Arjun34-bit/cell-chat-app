import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  Image,
  Input,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  AttachmentIcon,
  CalendarIcon,
  InfoIcon,
  InfoOutlineIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
// import { FaSmile } from "react-icons/fa";
import {
  getImage,
  getSender,
  getSenderFull,
  getreceiverId,
} from "../config/ChatLogics";
import ProfileModal from "./miscelleneous/ProfileModal";
import UpdateGroupChatModal from "./miscelleneous/UpdateGroupChatModal";
import axios from "axios";
import "./style.css";
import ScrollableChat from "./ScrollableChat";
import Lottie from "lottie-react";
import animationData from "../animation/typing.json";
import BsEmojiSmileFill, { BsEmojiLaughingFill } from "react-icons/bs";
import Picker, { Emoji } from "emoji-picker-react";
import cellchat from "../Images/cellchat.jpg";

import io from "socket.io-client";
import DeleteButton from "./miscelleneous/DeleteButton";
import ScheduleModal from "./miscelleneous/ScheduleModal";
import { encryptMessage } from "../config/Encryption";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  // const [loggedUser, setLoggedUser] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRation: "xMidYMid slice",
    },
  };

  const {
    user,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    chat,
  } = ChatState();

  const handlePickerOpen = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const emojiValue = (e, emoji) => {
    let msg = newMessage;
    msg += e.emoji;
    setNewMessage(msg);
  };

  const fetchAllMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/messages/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Could not fetch Messages",
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    socket = io();
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchAllMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const encMsg = encryptMessage(newMessage);
        const { data } = await axios.post(
          "/api/messages/",
          { content: encMsg, chatId: selectedChat._id },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Could not send Message",
          status: "error",
          duration: 3000,
          position: "bottom",
          isClosable: true,
        });
      }
    }
  };

  const sendMessageOnClick = async (event) => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "/api/messages/",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        console.log(data);

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Could not send Message",
          status: "error",
          duration: 3000,
          position: "bottom",
          isClosable: true,
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) {
      return;
    }
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const sendImage = () => {};

  // const checkOnlineStatus = (c) => {
  //   const chatMember = c.users.find((member) => member !== loggedUser._id);
  //   const online = onlineUsers.find((user) => user.userid === chatMember._id);
  //   console.log(online);
  //   return online ? true : false;
  // };

  return (
    <>
      {/* {chat.map((c) => (
          <MyChats online={checkOnlineStatus(c)} />
      ))} */}
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={"Work Sans"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowLeftIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
              <>
                <Avatar
                  mr={0}
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={getImage(user, selectedChat.users)}
                />
                <Text
                  fontSize={{ base: "12px", md: "27px" }}
                  fontStyle={"bold"}
                >
                  {getSender(user, selectedChat.users)}
                </Text>
                <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                  <InfoOutlineIcon size="1xl" marginLeft={"auto"} />
                </ProfileModal>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchAllMessages}
                  >
                    <InfoOutlineIcon />
                  </UpdateGroupChatModal>
                }

                <ScheduleModal
                  selectedChat={selectedChat}
                  messages={messages}
                  setMessages={setMessages}
                  setNewMessage={setNewMessage}
                />
              </>
            )}
            <div>
              <Box display={{ base: "none", md: "flex" }}>
                <DeleteButton
                  loggedUser={user}
                  senderName={getSender(user, selectedChat.users)}
                  id={selectedChat}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </Box>
            </div>
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg="#E8E8E8"
            // bg="black"
            w="100%"
            h="100%"
            borderRadius={"lg"}
            overflowY={"hidden"}
            fontFamily={"work sans"}
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <Box
              fontFamily={"work sans"}
              fontWeight={"bold"}
              textAlign={"center"}
              color="red"
              variant="solid"
              ml={11}
            >
              {isTyping ? <div>Typing....</div> : <></>}
            </Box>
            <FormControl
              onKeyDown={sendMessage}
              isRequired
              mt={3}
              display={"flex"}
            >
              {/* {isTyping ? <div>Loading...</div> : <></>} */}
              <div
                className="emoji-picker"
                style={{ position: "absolute", top: "-450px" }}
              >
                {showEmojiPicker && <Picker onEmojiClick={emojiValue} />}
              </div>
              <IconButton
                bgColor={"#E8E8E8"}
                icon={<BsEmojiLaughingFill color={"orange"} size={"25px"} />}
                onClick={handlePickerOpen}
              />
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter Message..."
                onChange={typingHandler}
                value={newMessage}
              />
              <IconButton
                icon={<ArrowRightIcon />}
                onClick={sendMessageOnClick}
              />
              <Tooltip label="Image Sending Coming Soon..">
                <IconButton
                  icon={<AttachmentIcon />}
                  onClick={sendImage}
                  disabled
                />
              </Tooltip>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          h="100%"
        >
          <img
            src={cellchat}
            alt="cell-chat"
            style={{ width: "250px", height: "250px" }}
          />
          {/* <Text fontSize={"3xl"} pb={3} fontFamily={"Work Sans"}>
            Click On a User to Start Chat
          </Text> */}
        </Box>
      )}
    </>
  );
};

export default SingleChat;
