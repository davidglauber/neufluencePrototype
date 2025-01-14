// Chakra Icons
import { BellIcon, MoonIcon, SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import { getAuth, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import routes from "routes.js";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useHistory();

  // Chakra Color Mode
  let mainTeal = useColorModeValue("orange.300", "orange.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();

  async function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate.push('/auth/signin');
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <Button
        onClick={() => logout()}
        ms="0px"
        px="0px"
        me={{ sm: "2px", md: "16px" }}
        color={navbarIcon}
        variant="transparent-with-icon"
        rightIcon={
          document.documentElement.dir ? (
            ""
          ) : (
            <SmallCloseIcon color={navbarIcon} w="22px" h="22px" me="0px" />
          )
        }
        leftIcon={
          document.documentElement.dir ? (
            <SmallCloseIcon color={navbarIcon} w="22px" h="22px" me="0px" />
          ) : (
            ""
          )
        }
      >
        <Text display={{ sm: "none", md: "flex" }}>Sign Out</Text>
      </Button>
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      <MoonIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        ref={settingsRef}
        onClick={toggleColorMode}
        color={navbarIcon}
        w="18px"
        h="18px"
      />

      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
