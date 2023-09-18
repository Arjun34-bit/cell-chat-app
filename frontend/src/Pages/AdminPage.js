import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [displayButton, setDisplayButton] = useState(false);

  const navigate = useNavigate();

  const handleButton = () => {
    if (adminId && password) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  };

  const handleAuthentic = () => {
    navigate(`/admin/${adminId}`);
  };

  return (
    <div className="login-box">
      <VStack spacing="5px" fontFamily={"work sans"}>
        <Box>
          <FormControl id="adminId" isRequired>
            <FormLabel>Admin Id :</FormLabel>
            <Input
              placeholder="ID......"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            ></Input>
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password :</FormLabel>
            <InputGroup>
              <Input
                type="password"
                placeholder="Password....."
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleButton();
                }}
              ></Input>
            </InputGroup>
          </FormControl>

          {displayButton ? (
            <Button
              className={displayButton ? "animate" : ""}
              fontWeight={"bold"}
              color={"black"}
              colorScheme="red"
              width={"100%"}
              style={{ marginTop: 15 }}
              onClick={handleAuthentic}
            >
              Authenticate
            </Button>
          ) : (
            ""
          )}
        </Box>
      </VStack>
    </div>
  );
};

export default AdminPage;
