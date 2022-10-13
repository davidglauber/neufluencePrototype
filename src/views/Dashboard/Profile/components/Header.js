// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { Separator } from "components/Separator/Separator";

const Header = ({
  backgroundHeader,
  backgroundProfile,
  avatarImage,
  name,
  email,
  tabs,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const [isOpen, setIsOpen] = useState(false);
  const [pageInformation, setPageInformation] = useState([]);



  function getPageToken() {
    FB.api(
      '/me/accounts',
      'GET',
      { "fields": "id,name,access_token,picture,about" },
      function (response) {
        setPageInformation(response.data)
      }
    );
  }

  function signInFacebookGraphAPI() {
    window.FB.login(function (response) {
      getPageToken()
      setIsOpen(true)

      if (response.status === 'connected') {
        alert('Logged successfully')
        // Logged into your webpage and Facebook.
      } else {
        alert('Error when logging on Facebook')
        // The person is not logged into your webpage or we are unable to tell. 
      }
    }, { scope: 'public_profile,email,pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,pages_manage_engagement' });
  }

  return (
    <Box
      mb={{ sm: "205px", md: "75px", xl: "70px" }}
      borderRadius='15px'
      px='0px'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      align='center'>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Facebook Pages</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {pageInformation.map((item) =>
              <Flex flexDirection={'column'}>
                <Flex style={{borderWidth: 1, borderColor: '#f4eff7', padding:7, borderRadius: 15}} flexDirection={'row'} alignItems="center" marginBottom={15}>
                  <Image
                    boxSize="50px"
                    borderRadius="lg"
                    objectFit="cover"
                    src={item.picture.data.url}
                    alt="Page's Picture"
                  />
                  <Text key={item.id} marginLeft={7} fontSize='md' color='gray.500' fontWeight='400'>
                    {item.name}
                  </Text>
                  {item.about !== undefined ?
                    <Text textAlign={"justify"} marginLeft={10} key={item.id} fontSize='smaller' color='black.400' fontWeight='400'>
                      {item.about}
                    </Text>
                    :
                    <Text textAlign={"justify"} position="absolute" right={10} key={item.id} fontSize='medium' color='black.400' fontWeight='bold'>
                      No Info
                    </Text>
                  }
                </Flex>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        bgImage={backgroundHeader}
        w='100%'
        h='300px'
        borderRadius='25px'
        bgPosition='50%'
        bgRepeat='no-repeat'
        position='relative'
        display='flex'
        justifyContent='center'>
        <Flex
          direction={{ sm: "column", md: "row" }}
          mx='1.5rem'
          maxH='330px'
          w={{ sm: "90%", xl: "95%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          backdropFilter='saturate(200%) blur(50px)'
          position='absolute'
          boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
          border='2px solid'
          borderColor={borderProfileColor}
          bg={backgroundProfile}
          p='24px'
          borderRadius='20px'
          transform={{
            sm: "translateY(45%)",
            md: "translateY(110%)",
            lg: "translateY(160%)",
          }}>
          <Flex
            align='center'
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Avatar
              me={{ md: "22px" }}
              src={avatarImage}
              w='80px'
              h='80px'
              borderRadius='15px'
            />
            <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight='bold'
                ms={{ sm: "8px", md: "0px" }}>
                {name}
              </Text>
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                fontWeight='semibold'>
                {email}
              </Text>
            </Flex>
          </Flex>
          <Flex
            direction={{ sm: "column", lg: "row" }}
            w={{ sm: "100%", md: "50%", lg: "auto" }}>
            <Button p='0px' bg='transparent' _hover={{ bg: "none" }}>
              <Flex
                align='center'
                w={{ sm: "100%", lg: "135px" }}
                bg='hsla(0,0%,100%,.3)'
                borderRadius='15px'
                justifyContent='center'
                py='10px'
                boxShadow='inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)'
                border='1px solid gray.200'
                cursor='pointer'>
                {tabs[0].icon}
                <Text
                  fontSize='xs'
                  color={textColor}
                  fontWeight='bold'
                  ms='6px'>
                  {tabs[0].name}
                </Text>
              </Flex>
            </Button>
            <Button p='0px' bg='transparent' _hover={{ bg: "none" }}>
              <Flex
                align='center'
                w={{ lg: "135px" }}
                borderRadius='15px'
                justifyContent='center'
                py='10px'
                mx={{ lg: "1rem" }}
                cursor='pointer'>
                {tabs[1].icon}
                <Text
                  fontSize='xs'
                  color={textColor}
                  fontWeight='bold'
                  ms='6px'>
                  {tabs[1].name}
                </Text>
              </Flex>
            </Button>
            <Button onClick={() => signInFacebookGraphAPI()} p='0px' bg='transparent' _hover={{ bg: "none" }}>
              <Flex
                align='center'
                w={{ lg: "135px" }}
                borderRadius='15px'
                justifyContent='center'
                py='10px'
                cursor='pointer'>
                {tabs[2].icon}
                <Text
                  fontSize='xs'
                  color={textColor}
                  fontWeight='bold'
                  ms='6px'>
                  {tabs[2].name}
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
