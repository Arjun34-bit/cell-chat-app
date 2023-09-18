import React from "react";
import QrReader from "react-qr-scanner";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";

const QRScanner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSelectedChat, chat, setChat, user } = ChatState();

  const toast = useToast();

  const handleScan = async (data) => {
    if (data) {
      const jsonValue = JSON.parse(data.text);
      accessChat(jsonValue._id);
      onClose();
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
    // const json = JSON.stringify({ userId: userid });
    try {
      // setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chats", { userId }, config);

      if (!chat.find((c) => c._id === data._id)) setChat([data, ...chat]);

      setSelectedChat(data);
      // setLoadingChat(false);
      // onClose();
    } catch (error) {
      toast({
        title: "Failure in Fetching the Chat",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
      // setLoadingChat(false);
      return;
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <Button onClick={onOpen} w={"100%"} variant={"ghost"}>
        Click To Scan & Chat
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan QRCode to Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", padding: "3px" }}
              willReadFrequently={true}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QRScanner;
