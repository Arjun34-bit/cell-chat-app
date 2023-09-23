import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  useDisclosure,
  ScaleFade,
} from "@chakra-ui/react";
import SignUp from "../componenets/Authentication/SignUp";
import Login from "../componenets/Authentication/Login";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { ChatIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const { isOpen, isClose, onToggle } = useDisclosure();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      // history.push("/chats");
    }
  });

  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    window.history.forward();
  });

  return (
    <Container maxW="xl" marginTop={"1"}>
      <Box
        display="flex"
        flex-basis="200px"
        justifyContent={"center"}
        p={3}
        bg={"black"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize={"3xl"}
          fontFamily={"work sans"}
          color={"DodgerBlue"}
          textAlign={"center"}
        >
          <ChatIcon marginRight={"1"}></ChatIcon>
          <span>Cell-Chat</span>
          <sub>(ßeta)</sub>
        </Text>
      </Box>
      <Box
        w="100%"
        p={4}
        borderRadius={"lg"}
        color={"white"}
        borderWidth={"1px"}
      >
        <Tabs variant="unstyled">
          <TabList
            mb={"1em"}
            fontSize={"3xl"}
            fontFamily={"work sans"}
            textAlign={"center"}
          >
            <Tab
              _selected={{ color: "white", bg: "blue.500" }}
              width={"50%"}
              color={"white"}
            >
              Login
            </Tab>
            <Tab
              _selected={{ color: "white", bg: " blue.400" }}
              width={"50%"}
              color={"white"}
              onClick={onToggle}
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* <ScaleFade initialScale={0.9} in={isOpen}> */}
              <Login />
              {/* </ScaleFade> */}
            </TabPanel>
            <TabPanel>
              {/* <ScaleFade initialScale={0.9} in={isOpen}> */} <SignUp />
              {/* </ScaleFade> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
