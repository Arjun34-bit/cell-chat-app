import {
  Box,
  Button,
  Tooltip,
  Text,
  MenuButton,
  MenuList,
  Menu,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { BellIcon, ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { lazy, Suspense } from "react";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import { getSender, getreceiverEmail } from "../../config/ChatLogics";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import QRScanner from "./QRScanner";
import Settings from "./Settings";
const ProfileModal = lazy(() => import("./ProfileModal"));
const UserListItem = lazy(() => import("../UserAvatar/UserListItem"));

const SideDrawer = ({}) => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();
  const [scannedData, setScannedData] = useState("");
  const navigate = useNavigate();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chat,
    setChat,
    notification,
    setNotification,
    setLoggedIn,
  } = ChatState();

  const notifySenderNames = [""];

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setSelectedChat("");
    setLoggedIn(false);
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter Username or Phone",
        status: "warning",
        duration: 3000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/users?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Failure in Fetching the Users",
        description: error.response,
        status: "error",
        duration: 3000,
        position: "top-left",
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
    // const json = JSON.stringify({ userId: userid });
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chats", { userId }, config);

      if (!chat.find((c) => c._id === data._id)) setChat([data, ...chat]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Failure in Fetching the Chat",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
      setLoadingChat(false);
      return;
    }
  };

  // const sendEmailNotify = async (mail, names) => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     await axios.put("api/notification/", { mail, names }, config);
  //   } catch (error) {}
  // };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        bg={"green"}
        padding="5px 10px 5px 10px"
        alignItems={"center"}
        width={"100%"}
        borderRadius={"5px"}
      >
        <Tooltip
          label="Search Users to chat"
          hasArrow
          placement="bottom-end"
          bg="blue"
        >
          <Button variant={"ghost"} onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              {" "}
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Box display={"flex"} color={"white"}>
          <Box>
            <Tooltip label={user.name} textTransform={"uppercase"}>
              <ChatIcon marginRight={"1"}></ChatIcon>
            </Tooltip>
          </Box>
          <Text
            fontSize={"2xl"}
            fontFamily={"Work Sans"}
            display={{ base: "none", md: "flex" }}
          >
            Cell-Chat
            <sub className="text">(ßeta)</sub>
          </Text>
        </Box>

        <div>
          <Menu>
            <MenuButton p={"1"}>
              <Badge colorScheme="red">
                {/* <NotificationIcon /> */}
                {notification.length}
              </Badge>
              {/* <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              /> */}
              <BellIcon fontSize="2xl" m={"1"}></BellIcon>
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notify) => (
                <MenuItem
                  color={"black"}
                  key={notify._id}
                  onClick={() => {
                    setSelectedChat(notify.chat);
                    setNotification(notification.filter((n) => n !== notify));
                  }}
                >
                  {notify.chat.isGroupChat
                    ? `New Message in ${notify.chat.chatName}`
                    : `New Message From ${getSender(user, notify.chat.users)}`}
                </MenuItem>
              ))}
              {/* {notification.map((n) =>
                notifySenderNames.push(getSender(user, n.chat.users))
              )}
              {notification
                ? sendEmailNotify(user.email, notifySenderNames)
                : ""} */}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>

            <MenuList fontWeight={"bold"}>
              <Suspense>
                <ProfileModal user={user}>
                  <MenuItem color={"black"} textAlign={"center"}>
                    My Profile
                  </MenuItem>
                </ProfileModal>
              </Suspense>
              <MenuDivider />

              <QRScanner>
                <MenuItem>Scan QR</MenuItem>
              </QRScanner>
              <MenuDivider />
              <Settings>
                <MenuItem>Actions</MenuItem>
              </Settings>

              <MenuDivider />
              <MenuItem
                color={"black"}
                onClick={logoutHandler}
                textAlign={"center"}
              >
                LogOut
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Enter Phone or Username"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch} isLoading={loading}>
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((u) => (
                <Suspense>
                  <UserListItem
                    key={u._id}
                    user={u}
                    handleFunction={() => accessChat(u._id)}
                  />
                </Suspense>
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
