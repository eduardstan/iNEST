import React from "react";
import { Center, Heading, Flex, Box, Button, ButtonGroup, Spacer } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
        justifyContent='center'
        bg='blue.400'
        color='white'
    >
        <Heading as='h1'>
            Interconnected Nord-Est Innovation Ecosystem (iNEST)
        </Heading>
    </Flex>
  );
};

export default Header;