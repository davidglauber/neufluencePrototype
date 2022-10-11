// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar5.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import { SettingsIcon } from "components/Icons/Icons";
import React from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Conversations from "./components/Conversations";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";
import Projects from "./components/Projects";

function Profile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  return (
    <Flex direction='column'>
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        avatarImage={avatar4}
        name={"David Glauber"}
        email={"davidglauber2010@hotmail.com"}
        tabs={[
          {
            name: "OVERVIEW",
            icon: <FaCube w='100%' h='100%' />,
          },
          {
            name: "SETTINGS",
            icon: <SettingsIcon w='15%' h='15%' />,
          },
          {
            name: "INTEGRATING",
            icon: <FaPenFancy w='100%' h='100%' />,
          },
        ]}
      />
      <Grid alignItems='center'  gap='22px'>
        {/* <PlatformSettings
          title={"Platform Settings"}
          subtitle1={"ACCOUNT"}
          subtitle2={"APPLICATION"}
        /> */}
        <ProfileInformation
          title={"Profile Information"}
          description={
            "Hi, I’m David Glauber, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
          }
          name={"David Glauber"}
          mobile={"(44) 123 1234 123"}
          email={"davidglauber2010@hotmail.com"}
          location={"Brazil"}
        />
        <Conversations title={"Conversations"} />
      </Grid>
      {/* <Projects title={"Projects"} description={"Architects design houses"} /> */}
    </Flex>
  );
}

export default Profile;
