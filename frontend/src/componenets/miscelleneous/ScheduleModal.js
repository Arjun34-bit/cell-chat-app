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

const ScheduleModal = ({ selectedChat }) => {
  const [currentTime, setCurrentTime] = useState("");
  const { user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const hours = [];
  const minutes = [];
  for (let i = 0; i < 12; i++) {
    hours.push(i + 1);
  }
  for (let j = 0; j < 60; j++) {
    minutes.push(j);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const getTime = () => {
    let date = new Date();
    let h = date.getHours();
    let m = date.hetMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if (h >= 12) {
      h = h - 12;
      ampm = "PM";
    }

    h = h == 0 ? (h = 12) : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return `${h}:${m}:${s} ${ampm}`;
  };

  const handleSchedule = () => {
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "This Feature is Available to only Admin",
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
          <ModalHeader>Schedule Your Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"3xl"} fontFamily={"Work Sans"}>
              {currentTime}
            </Text>
            <HStack marginTop={5}>
              <Select placeholder="Hours">
                {hours.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
              <Select placeholder="Minute">
                {minutes.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
              <Select placeholder="AM/PM">
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </Select>
            </HStack>

            <FormControl id="msg" isRequired mt={5}>
              <FormLabel>Message :</FormLabel>
              <Input placeholder="Enter Your Message"></Input>
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
              onClick={() => handleSchedule}
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
