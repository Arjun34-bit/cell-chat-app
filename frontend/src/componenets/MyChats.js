import React, { useEffect, useRef, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import {
  AddIcon,
  AtSignIcon,
  CloseIcon,
  DeleteIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getImage, getSender, getSenderFull } from "../config/ChatLogics";
import GroupChatModal from "./miscelleneous/GroupChatModal";
import DeleteButton from "./miscelleneous/DeleteButton";
import ProfileModal from "./miscelleneous/ProfileModal";

const MyChats = ({ setFetchAgain, fetchAgain, online }) => {
  // window.location.reload(false);
  const [loggedUser, setLoggedUser] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [menuOperation, setMenuOperation] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const [showOperations, setShowOperations] = useState(false);
  const { user, selectedChat, setSelectedChat, chat, setChat, buttonColor } =
    ChatState();

  const touchStartTimestamp = useRef(null);

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chats/", config);
      setChat(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.message,
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  //Long Press Functions ---starts

  let longPressTimeout;

  // const handleTouchStart = () => {
  //   longPressTimeout = setTimeout(() => {
  //     setShowOperations(true);
  //   }, 1000);
  // };

  // const handleTouchEnd = () => {
  //   setShowOperations(false);
  //   clearTimeout(longPressTimeout);
  // };

  const handleTouchStart = () => {
    touchStartTimestamp.current = Date.now();

    // Start a timeout after 1 second
    setTimeout(() => {
      const touchDuration = Date.now() - touchStartTimestamp.current;
      if (touchDuration >= 1000) {
        setShowOperations(true);
      }
    }, 1000);
  };

  const handleTouchEnd = () => {
    // Clear the timeout if the touch ends
    clearTimeout();
    touchStartTimestamp.current = null;

    // Always set showOperations to false when the touch ends
    setShowOperations(false);
  };

  //Long Press Functions ---ends
  const handleBack = () => {
    setSelectedChat("");
    setShowOperations(false);
    return true;
  };

  useEffect(() => {
    window.addEventListener("popstate", handleBack);
    window.addEventListener("backbutton", handleBack);
    // myElementRef.current.addEventListener("touchstart", handleTouchStart);
    // myElementRef.current.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("popstate", handleBack);
      window.removeEventListener("backbutton", handleBack);
      // myElementRef.current.removeEventListener("touchstart", handleTouchStart);
      // myElementRef.current.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      {showOperations ? (
        <Box
          display="flex"
          color={"white"}
          pb={3}
          px={3}
          fontSize={{ base: "15px", md: "none" }}
          fontFamily={"Work Sans"}
          d="flex"
          w="100%"
          justifyContent={"space-between"}
          alignItems={"center"}
          className="show-operations"
        >
          <CloseIcon color={"black"} onClick={() => setShowOperations(false)} />
          <DeleteButton
            loggedUser={user}
            senderName={getSender(user, menuOperation.users)}
            id={menuOperation}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
        </Box>
      ) : (
        <Box
          display="flex"
          color={"black"}
          pb={3}
          px={3}
          fontSize={{ base: "15px", md: "30px" }}
          fontFamily={"Work Sans"}
          d="flex"
          w="100%"
          justifyContent={"space-between"}
          alignItems={"center"}
          className="my-chats"
        >
          My Chats
          <GroupChatModal>
            <Button
              display="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              Create Group
            </Button>
          </GroupChatModal>
        </Box>
      )}

      {!chat ? (
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          h="100%"
        >
          <Text
            fontSize={"2xl"}
            pb={3}
            fontFamily={"Work Sans"}
            color={"white"}
          >
            Use Search Button to find friends
          </Text>
        </Box>
      ) : (
        <Box
          d="flex"
          flexDir={"column"}
          p={3}
          // bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius={"lg"}
          overflow={"hidden"}
          animation={"ease-in"}
        >
          {chat ? (
            <Stack overflowY="scroll">
              {chat.map((cha) => (
                <Box
                  fontFamily={"Work Sans"}
                  onTouchStart={() => {
                    handleTouchStart();
                    setMenuOperation(cha);
                  }}
                  onTouchEnd={handleTouchEnd}
                  onClick={() => {
                    setSelectedChat(cha);
                  }}
                  cursor={"pointer"}
                  bg={selectedChat === cha ? "#4CAF50" : "#E8E8E8"}
                  color={selectedChat === cha ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius={"lg"}
                  key={cha._id}
                >
                  <Text fontSize={{ base: "18px", md: "24px" }}>
                    <Avatar
                      mr={2}
                      size="sm"
                      cursor="pointer"
                      name={
                        !cha.isGroupChat
                          ? getSender(loggedUser, cha.users)
                          : cha.chatName
                      }
                      src={
                        !cha.isGroupChat
                          ? getImage(loggedUser, cha.users)
                          : cha.pic
                      }
                    />
                    {!cha.isGroupChat
                      ? getSender(loggedUser, cha.users)
                      : cha.chatName}
                  </Text>
                  {cha.latestMessage && (
                    <Text fontSize="xs" paddingLeft={"8"}>
                      <b>{cha.latestMessage.sender.name} : </b>
                      {cha.latestMessage.content.length > 50
                        ? cha.latestMessage.content.substring(0, 51) + "..."
                        : cha.latestMessage.content}
                    </Text>
                  )}
                  {!cha.isGroupChat ? (
                    <span color="black">{online ? "Online" : ""}</span>
                  ) : (
                    ""
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyChats;
