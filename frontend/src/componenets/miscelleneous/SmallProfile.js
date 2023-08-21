import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const SmallProfile = ({ isOpen, setShowProfile, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal size="lg" isOpen={isOpen} onClose={setShowProfile(false)} isCentered>
      <ModalOverlay />
      <ModalContent height={"410px"}>
        <ModalHeader
          display="flex"
          fontSize={"22px"}
          fontFamily={"Work Sans"}
          justifyContent={"center"}
        >
          {user.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            name={user.name}
          />
          <Text fontSize={{ base: "15px" }} fontFamily="Work Sans">
            Contact :{user.phone}
          </Text>
          <Text fontSize={{ base: "15px" }} fontFamily="Work Sans">
            Email :{user.email}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => setShowProfile(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SmallProfile;
