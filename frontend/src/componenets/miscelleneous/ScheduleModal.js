import React from "react";
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
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

const ScheduleModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hours = [];
  const minutes = [];
  for (let i = 0; i < 13; i++) {
    hours.push(i + 1);
  }
  for (let j = 0; j < 60; j++) {
    minutes.push(j + 1);
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
          <ModalHeader>Schedule Your Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text display={"flex"} justifyContent={"center"}>
              Select Time
            </Text>
            <HStack>
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
