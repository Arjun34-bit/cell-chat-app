import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScaleFade,
  Slide,
  Stack,
  Text,
  useDisclosure,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon, DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import {
  getImage,
  getSender,
  getSenderFull,
  getreceiverId,
} from "../config/ChatLogics";
import GroupChatModal from "./miscelleneous/GroupChatModal";
import DeleteButton from "./miscelleneous/DeleteButton";
import ProfileModal from "./miscelleneous/ProfileModal";

const MyChats = ({ setFetchAgain, fetchAgain, online }) => {
  // window.location.reload(false);
  const [loggedUser, setLoggedUser] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [menuOperation, setMenuOperation] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [longPressActive, setLongPressActive] = useState(false);
  const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();

  const { isOpen, inOpen, onOpen, onClose, onToggle } = useDisclosure();
  const cancelRef = React.useRef();

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

  const handleTouchStart = () => {
    longPressTimeout = setTimeout(() => {
      alert("hello");
      isOpen();
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimeout);
  };

  //Long Press Functions ---ends

  //Chat Removal for small screen code ---starts

  const removeChat = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chats/removechat/",
        { chatId: id._id },
        config
      );
      toast({
        title: ` Chat Removed`,
        status: "success",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      setMenuOperation("");
      setFetchAgain(true);
      return;
    } catch (error) {
      toast({
        title: "Chat Removal Failed",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
  };
  //Chat Removal for small screen code ---ends

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
        fontSize={{ base: "15px", md: "30px" }}
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
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                onClick={() => {
                  setSelectedChat(cha);
                  setMenuOperation(cha);
                }}
                cursor={"pointer"}
                bg={selectedChat === cha ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === cha ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={cha._id}
              >
                <Text fontSize={{ base: "18px", md: "24px" }}>
                  {/* {!cha.isGroupChat ? (
                    <DeleteButton
                      loggedUser={loggedUser}
                      senderName={getSender(loggedUser, menuOperation.users)}
                      id={selectedChat}
                      fetchChats={fetchChats}
                      fetchAgain={fetchAgain}
                      openS={isOpen}
                      onClose={onClose}
                    />
                  ) : (
                    ""
                  )} */}

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
                  <Text fontSize="xs" marginRight={"15px"}>
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

            <Menu color="black" isOpen={isOpen} onClose={onClose}>
              <MenuButton></MenuButton>
              <MenuList color={"black"} fontSize={"20px"}>
                {/* <ProfileModal> */}
                <MenuItem>Profile</MenuItem>
                {/* </ProfileModal> */}
                <MenuDivider />
                <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
                  Remove Chat
                </MenuItem>
              </MenuList>
              <AlertDialog
                isOpen={inOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Remove Chat
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => removeChat(menuOperation._id)}
                        ml={3}
                      >
                        Remove
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Menu>
            {/* <DeleteButton
              loggedUser={loggedUser}
              // senderName={getSender(loggedUser, cha.users)}
              id={menuOperation}
              fetchChats={fetchChats}
              fetchAgain={fetchAgain}
              isOpen={isOpen}
              onClose={onClose}
            /> */}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
