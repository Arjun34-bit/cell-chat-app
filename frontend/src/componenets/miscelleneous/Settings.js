import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shareUrl = "https://cell-chat.onrender.com/";
  const title = "Join, Cell-Chat for new xP-rience";
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2>Share this page:</h2>
            <FacebookShareButton url={shareUrl} quote={title}>
              Facebook
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              Twitter
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={title}>
              LinkedIn
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl}>
              Share on WhatsApp
            </WhatsappShareButton>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Settings;
