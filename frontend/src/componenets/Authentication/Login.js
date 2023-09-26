import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import React from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginviaOTP from "../miscelleneous/LoginviaOTP";

function Login({ history }) {
  const { isOpen, isClose, onToggle } = useDisclosure();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState();
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!phone || !password) {
      if (!toastShown) {
        toast({
          title: "Please fill all Fields",
          status: "warning",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      }
      setToastShown(true);
      setLoading(false);
      return;
    }
    setToastShown(false);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/users/login",
        { phone, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
      setLoading(false);
      return;
    } catch (error) {
      toast({
        title: "Failure in Login",
        description: error.response.data.message,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px" fontFamily={"work sans"}>
      <FormControl id="phone" isRequired>
        <FormLabel>Contact :</FormLabel>
        <Input
          placeholder="Enter Your Contact No."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password :</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        fontWeight={"bold"}
        color={"black"}
        variant="solid"
        colorScheme="gray"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        variant="solid"
        colorScheme="blackAlpha"
        width="100%"
        onClick={() => {
          setPhone(1234567890);
          setPassword("guest@10");
        }}
      >
        Try the Guest Mode
      </Button>
      <div textAlign="center" fontWeight="bold">
        OR
      </div>
      <Tooltip label="working-on-it">
        {/* <ScaleFade initialScale={0.9} in={isOpen}> */}
        <LoginviaOTP>
          <Button variant="solid" colorScheme="blue" width="100%">
            Login via OTP
          </Button>
        </LoginviaOTP>
        {/* </ScaleFade> */}
      </Tooltip>
    </VStack>
  );
}

export default Login;
