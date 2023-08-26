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
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select placeholder="Minute">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select placeholder="AM/PM">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
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
