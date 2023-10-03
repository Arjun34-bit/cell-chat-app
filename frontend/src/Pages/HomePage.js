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
import { useEffect } from "react";
import cellchat from "../Images/cellchat.jpg";
import { ChatIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isOpen, isClose, onToggle } = useDisclosure();
  const { loggedIn, setLoggedIn } = ChatState();

  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setLoggedIn(true);
      navigate("chats");
    }
  });

  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    window.history.forward();
  });

  return (
    <Container maxW="xl" marginTop={"1"}>
      <Box
        className="cell-box"
        display="flex"
        flex-basis="200px"
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="0.5px"
      >
        <hr style={{ color: "green" }} />
        <img
          src={cellchat}
          alt="cell-chat"
          style={{ width: "100px", height: "100px" }}
        />
        <hr style={{ color: "green" }} />
        {/* <Text
          fontSize={"3xl"}
          fontFamily={"work sans"}
          color={"black"}
          textAlign={"center"}
        >
          <ChatIcon marginRight={"1"}></ChatIcon>
          <span>Cell-Chat</span>
          <sub>(ßeta)</sub>
        </Text> */}
      </Box>
      <Box
        w="100%"
        p={4}
        bg={"#4CAF50"}
        borderRadius={"lg"}
        color={"black"}
        borderWidth={"1px"}
        className="component-box"
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
              color={"black"}
            >
              Login
            </Tab>
            <Tab
              _selected={{ color: "white", bg: " blue.400" }}
              width={"50%"}
              color={"black"}
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
