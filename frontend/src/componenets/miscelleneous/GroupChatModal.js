import {
  Box,
  Button,
  FormControl,
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
import React, { Suspense, lazy, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
const UserListItem = lazy(() => import("../UserAvatar/UserListItem"));

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();

  const toast = useToast();

  const { user, chat, setChat } = ChatState();

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
      console.log(data);
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
      return;
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Enter Group Name and Select Users",
        status: "warning",
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

      const { data } = await axios.post(
        "/api/chats/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((m) => m._id)),
        },
        config
      );

      setChat([data, ...chat]);
      setLoading(false);
      onClose();
      toast({
        title: "Group Created",
        status: "success",
        position: "bottom",
        duration: 2000,
        isClosable: true,
      });
      return;
    } catch (error) {
      toast({
        title: "Group Creation Failed",
        description: error.response.data.message,
        status: "error",
        position: "bottom",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };
  const handleGroup = (addUser) => {
    if (selectedUsers.includes(addUser)) {
      toast({
        title: "User already Added",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
    setSelectedUsers([...selectedUsers, addUser]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work Sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create a Group
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Enter Group Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Search Users to add them"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <Suspense>
                  <UserBadgeItem
                    key={user._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                </Suspense>
              ))}
            </Box>
            {loading ? (
              <div>Processing...</div>
            ) : (
              searchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
