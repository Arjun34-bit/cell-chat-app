import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "@chakra-ui/react";

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  // Add more country codes here
];

function SignUp({ history }) {
  const [show, setShow] = useState(false);
  const [showcp, setShowcp] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "cell-app");
      data.append("cloud_name", "cell-chat-app");
      fetch("https://api.cloudinary.com/v1_1/cell-chat-app/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select (JPEG or PNG) Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleClickP = () => setShow(!show);
  const handleClickCP = () => setShowcp(!showcp);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !phone || !email || !password || !confirmpassword) {
      // if (!toastShown) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // }
      // setToastShown(true);
      setLoading(false);
      return;
    }
    setToastShown(false);

    if (password.length < 6) {
      toast({
        title: "Required more than 6 characters/digits",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords are not Matching",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/",
        { name, email, phone, password, pic },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Registration Failure",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
      // console.log(error);
    }
  };

  const passwordValidation = (e) => {
    setPassword(e.target.value);
    if (e.target.value < 6) {
      toast({
        title: "Password length should be atleast 6",
        status: "info",
        duration: 1500,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };

  return (
    <VStack spacing="5px" fontFamily={"work sans"}>
      <FormControl id="name" isRequired>
        <FormLabel>Name :</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email :</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="phone" isRequired>
        {/* <Select size="sm" colorScheme="black" color={"turquoise"}>
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.country} ({country.code})
            </option>
          ))}
        </Select> */}
        <FormLabel>Contact :</FormLabel>
        <InputGroup>
          <InputLeftAddon color={"black"} children="+91" />
          <Input
            placeholder="Enter Your Contact No."
            onChange={(e) => setPhone(e.target.value)}
          ></Input>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password :</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Aleast 6 Characters or Digits"
            onChange={passwordValidation}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size={"sm"} onClick={handleClickP}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password :</FormLabel>
        <InputGroup>
          <Input
            type={showcp ? "text" : "password"}
            placeholder="Re-enter Your Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"} onClick={handleClickCP}>
            <Button h="1.75rem" size={"sm"}>
              {showcp ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Profile Pic</FormLabel>
        <Input
          type="file"
          p={"1.5"}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>

      <Button
        fontWeight={"bold"}
        color={"blue.900"}
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Register Your Cell-Chat account
      </Button>
    </VStack>
  );
}

export default SignUp;
