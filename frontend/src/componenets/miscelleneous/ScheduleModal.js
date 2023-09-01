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
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [finalTime, setFinalTime] = useState("");
  const [states, setStates] = useState("");
  const [mess, setMess] = useState("");
  const [status, setStatus] = useState(false);
  const { user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const hours = [];
  const minutes = [];
  for (let i = 0; i < 12; i++) {
    if (i < 10) {
      hours.push("0" + i);
    } else {
      hours.push(i + 1);
    }
  }
  for (let j = 0; j < 60; j++) {
    if (j < 10) {
      minutes.push("0" + j);
    } else {
      minutes.push(j);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const handleTime = () => {
    setFinalTime(`${hour}:${minute} ${states}`);
  };

  const handleSchedule = () => {
    console.log(finalTime);
    if (!hour || !minute || !states) {
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
        title: "This Feature is Available to only Admin",
        status: "error",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      return;
    } else {
      setStatus(true);
      toast({
        title: `Message Scheduled on ${finalTime}`,
        status: "success",
        duration: 2000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
  };

  const sendMessage = () => {
    if (currentTime === finalTime) {
      console.log("Working!!");
    }
    setStatus(false);
    setFinalTime("");
  };

  let intervalId = "";
  if (status) {
    intervalId = setInterval(sendMessage, 1000);
  } else {
    clearInterval(intervalId);
  }

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
              fontSize: "sm",
            }}
          >
            Keep Your Wi-Fi or Data connection on
          </span>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"3xl"} fontFamily={"Work Sans"}>
              {currentTime}
            </Text>
            <HStack marginTop={5}>
              <Select
                placeholder="Hours"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              >
                {hours.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
              <Select
                placeholder="Minute"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              >
                {minutes.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
              <Select
                placeholder="AM/PM"
                value={states}
                onChange={(e) => {
                  setStates(e.target.value);
                  handleTime();
                }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </Select>
            </HStack>

            <FormControl id="msg" isRequired mt={5}>
              <FormLabel>Message :</FormLabel>
              <Input
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
