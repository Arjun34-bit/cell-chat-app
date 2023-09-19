import { ViewIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  IconButton,
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
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import QRCode from "qrcode.react";
import ScrollableFeed from "react-scrollable-feed";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgorQr, setImgorQr] = useState(false);
  const { loggedUser } = ChatState();
  const jsonString = JSON.stringify(user);

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height={"410px"}>
          <ModalHeader
            display="flex"
            fontSize={"30px"}
            fontFamily={"Work Sans"}
            justifyContent={"center"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ScrollableFeed>
            <ModalBody
              display="flex"
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              h={300}
            >
              {!imgorQr ? (
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={user.pic}
                  name={user.name}
                />
              ) : (
                <div className={imgorQr ? "animate" : ""}>
                  <QRCode value={jsonString} />
                </div>
              )}

              <Button
                colorScheme="blue"
                mt={2}
                mb={2}
                onClick={() => setImgorQr(!imgorQr)}
              >
                {!imgorQr ? "Share Profile via QR" : " View Profile"}
              </Button>

              <Box display="flex" justifyContent={"space-between"}>
                <Text
                  fontSize={{ base: "20px", md: "22px" }}
                  fontFamily="Work Sans"
                >
                  Contact :{user.phone}
                </Text>
                <Text
                  fontSize={{ base: "20px", md: "22px" }}
                  fontFamily="Work Sans"
                >
                  Email :{user.email}
                </Text>
              </Box>
            </ModalBody>
          </ScrollableFeed>

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

export default ProfileModal;
