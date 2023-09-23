import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import OtpInput from "otp-input-react";
import { useNavigate } from "react-router-dom";

const LoginviaOTP = ({ children }) => {
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState(false);
  const [err, setErr] = useState(false);
  const [spin, setSpin] = useState(false);
  const [otpval, setOtpVal] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const sendOTP = async () => {
    if (!email) {
      toast({
        title: "Please enter Valid Email",
        status: "warning",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/otp", { email }, config);
      setOtp(true);
      setErr(false);
      setLoading(false);
      toast({
        title: "OTP sent to your Email",
        status: "success",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    } catch (error) {
      setOtp(false);
      setErr(true);
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otpval) {
      toast({
        title: "Please enter you OTP",
        status: "warning",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }

    try {
      toast({
        title: "Signing In....",
        status: "loading",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      // setSpin(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/otp/verify", { otpval }, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
      // setSpin(false);
    } catch (error) {
      // setSpin(false);
      toast({
        title: "Invalid OTP",
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"black"} color={"white"} fontFamily={"work sans"}>
          <ModalHeader display={"flex"} justifyContent={"center"}>
            Login via OTP
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="email" isRequired>
              <FormLabel>Email :</FormLabel>
              <Input
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              {err ? (
                <Box color="red" fontWeight={"bold"} fontFamily={"work sans"}>
                  <div pl={2}>Email Not registered</div>
                </Box>
              ) : (
                <div></div>
              )}
            </FormControl>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                colorScheme="blue"
                mt={3}
                width={"100%"}
                onClick={sendOTP}
                isLoading={loading}
              >
                Send OTP
              </Button>
            </Box>

            {otp ? (
              <Box mt={5}>
                <div>
                  <FormControl id="phone" isRequired>
                    <FormLabel>Enter OTP :</FormLabel>
                    <Box
                      display="flex"
                      justifyContent={"center"}
                      color={"black"}
                    >
                      <OtpInput
                        OTPLength={4}
                        otpType="number"
                        autoFocus
                        value={otpval}
                        onChange={setOtpVal}
                      ></OtpInput>
                    </Box>
                  </FormControl>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Button
                      colorScheme="blue"
                      mt={3}
                      width={"100%"}
                      onClick={verifyOTP}
                    >
                      Verify OTP & Login
                    </Button>
                  </Box>
                </div>
              </Box>
            ) : (
              <div></div>
            )}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginviaOTP;
