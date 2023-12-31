import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  useToast,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import { useEffect } from "react";
import axios from "axios";
import ProfileModal from "./ProfileModal";

const DeleteButton = ({
  senderName,
  id,
  fetchChats,
  openS,
  OnClose,
  setFetchAgain,
  col,
}) => {
  const { user, setSelectedChat, selectedChat } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

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
      setSelectedChat("");
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

  useEffect(() => {
    //fetchChats();
  }, [removeChat]);

  return (
    <Menu color="black">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<DeleteIcon color={"black"} />}
        variant="ghost"
        borderRadius={"25px"}
        fontFamily={"Work Sans"}
        boxShadow="md"
      ></MenuButton>
      <MenuList color={"black"} fontSize={"20px"}>
        <MenuDivider />
        <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
          {/* {chat.map((c) => ( */}
          Remove
          {/* ))} */}
        </MenuItem>
      </MenuList>
      <AlertDialog
        isOpen={isOpen}
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
              <Button colorScheme="red" onClick={() => removeChat(id)} ml={3}>
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Menu>
  );
};

export default DeleteButton;
