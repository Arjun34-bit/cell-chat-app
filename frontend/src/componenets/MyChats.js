import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Avatar,
  Box,
  Button,
  ScaleFade,
  Slide,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getImage, getSender, getreceiverId } from "../config/ChatLogics";
import GroupChatModal from "./miscelleneous/GroupChatModal";
import DeleteButton from "./miscelleneous/DeleteButton";

const MyChats = ({ fetchAgain, online }) => {
  // window.location.reload(false);
  const [loggedUser, setLoggedUser] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();
  const { isOpen, onToggle } = useDisclosure();

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

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg="black"
      w={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        display="flex"
        color={"white"}
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work Sans"}
        d="flex"
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
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
                onClick={() => setSelectedChat(cha)}
                cursor={"pointer"}
                bg={selectedChat === cha ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === cha ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={cha._id}
              >
                <Text fontSize={{ base: "10px", md: "1xl" }}>
                  {!cha.isGroupChat ? (
                    <DeleteButton
                      loggedUser={loggedUser}
                      senderName={getSender(loggedUser, cha.users)}
                      id={selectedChat}
                      fetchChats={fetchChats}
                      fetchAgain={fetchAgain}
                    />
                  ) : (
                    ""
                  )}
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
                {chat.latestMessage && (
                  <Text fontSize={"xs"}>
                    <b>{chat.latestMessage.sender.name} :</b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
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
    </Box>
  );
};

export default MyChats;
