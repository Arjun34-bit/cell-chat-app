import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Select,
  Button,
  HStack,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { getCurrentTime } from "../../config/TimeLogics";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";

const ScheduleModal = ({
  selectedChat,
  messages,
  setNewMessage,
  setMessages,
}) => {
  const [finalTime, setFinalTime] = useState("");
  const [mess, setMess] = useState("");
  const { user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const handleSchedule = async () => {
    // if (!hour || !minute || !states) {
    //   toast({
    //     title: "Please Schedule your Time appropriatly",
    //     status: "error",
    //     duration: 2000,
    //     position: "bottom",
    //     isClosable: true,
    //   });
    //   return;
    // }
    if (!finalTime) {
      toast({
        title: "Please Schedule your Time appropriatly",
        status: "error",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
    if (!mess) {
      toast({
        title: "Message can't be blank",
        status: "error",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admin can Schedule Messages",
        status: "error",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      return;
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        toast({
          title: `Message Scheduled on ${finalTime}`,
          status: "success",
          duration: 2000,
          position: "bottom",
          isClosable: true,
        });
        onClose();
        const { data } = await axios.post(
          "/api/schedule/",
          { content: mess, chatId: selectedChat._id, timeCode: finalTime },
          config
        );
        setMessages([...messages, data]);
        return;
      } catch (error) {}
      toast({
        title: "Scheduling Failed",
        status: "error",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
  };

  return (
    <>
      <Button
        as={IconButton}
        aria-label="Options"
        icon={<CalendarIcon />}
        variant="ghost"
        borderRadius={"25px"}
        fontFamily={"Work Sans"}
        boxShadow="md"
        onClick={onOpen}
      ></Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        fontFamily={"work sans"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Schedule and Send</ModalHeader>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            Keep Your Wi-Fi or Data connection on
          </span>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="msg" isRequired mt={5}>
              <FormLabel>Select Time (24hrs Format) :</FormLabel>
              <Input
                width={"100%"}
                type="time"
                value={finalTime}
                onChange={(e) => setFinalTime(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl id="msg" isRequired mt={5}>
              <FormLabel>Message :</FormLabel>
              <Input
                type="text"
                placeholder="Enter Your Message"
                value={mess}
                onChange={(e) => setMess(e.target.value)}
              ></Input>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mt={5}
              variant="solid"
              colorScheme="blue"
              color="black"
              display={"flex"}
              justifyContent={"center"}
              w={"100%"}
              onClick={handleSchedule}
            >
              Schedule
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScheduleModal;
