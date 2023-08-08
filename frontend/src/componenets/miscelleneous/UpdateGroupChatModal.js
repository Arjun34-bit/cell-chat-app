import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import axios from "axios";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [renameLoading, setRenameLoading] = useState(false);
  const [loading, setLoading] = useState();

  const { selectedChat, setSelectedChat, user } = ChatState();

  const toast = useToast();

  const handleRemove = async (rmuser) => {
    console.log(selectedChat);
    if (selectedChat.groupAdmin._id !== user._id && rmuser._id !== user._id) {
      toast({
        title: "Only Admins can remove Members",
        status: "error",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chats/groupremove",
        { chatId: selectedChat._id, userId: rmuser._id },
        config
      );

      toast({
        title: "Member removed",
        status: "success",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      rmuser._id === user.id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
      return;
    } catch (error) {
      toast({
        title: "Member Removal Failed",
        status: "error",
        description: error.message,
        position: "bottom",
        isClosable: true,
        duration: 3000,
      });
      setLoading(false);
      return;
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chats/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      toast({
        title: "Group Name Updated",
        status: "success",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      return;
    } catch (error) {
      toast({
        title: "Chat Name Updation Failed",
        description: error.response,
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "User Not Found",
        status: "error",
        description: error.response.data.message,
        position: "bottom",
        isClosable: true,
        duration: 3000,
      });
      setLoading(false);
      return;
    }
  };

  const handleAdd = async (addUser) => {
    //groupAdmin is missing in selectedChat()
    if (selectedChat.users.find((u) => u._id === addUser._id)) {
      toast({
        title: "User already in the Group",
        status: "info",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admins can add Members",
        status: "error",
        duration: 2000,
        position: "bottom",
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

      const { data } = await axios.put(
        "/api/chats/groupadd",
        {
          chatId: selectedChat._id,
          userId: addUser._id,
        },
        config
      );
      toast({
        title: "Member Added",
        status: "success",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      return;
    } catch (error) {
      toast({
        title: "Member addition failed",
        description: error.message,
        status: "error",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Group Members :</Text>
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
              {/* {loading ? <div>Removing User...</div> : ""} */}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Update Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant={"solid"}
                colorScheme="green"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl display={"flex"}>
              <Input
                placeholder="Search Users to add them"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <div>Processing...</div>
            ) : (
              searchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAdd(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button colorScheme="red" mr={3} onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
