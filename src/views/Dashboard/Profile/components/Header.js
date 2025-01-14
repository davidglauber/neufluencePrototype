// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
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

import { FaFacebook, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const bgIcons = useColorModeValue("orange.200", "rgba(255, 255, 255, 0.5)");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [pageInformation, setPageInformation] = useState([]);
  const [pagePosts, setPagePosts] = useState([]);
  


  function getPageToken() {
    FB.api(
      '/me/accounts',
      'GET',
      { "fields": "id,name,access_token,picture,about" },
      function (response) {
        if (response.data.length !== 0) {
          setPageInformation(response.data)
          setIsOpen(true)
          setIsOpen2(false)
        }
      }
      
    );
    
  }

  function getPagePosts(id, token) {
    // alert('id é: ' + id)
    FB.api(
      `/${id}/posts`,
      'GET',
      { "fields": "id,story,attachments{media},permalink_url,message", 'access_token': token },
      function (response) {
        // alert(JSON.stringify(response))
        if (response && !response.error) {
          /* handle the result */
          if (response.data.length !== 0) {
            setPagePosts(response.data)
            setIsOpen(false)
            setIsOpen3(true)
          }
        }
      }
    );
  }

  function signInFacebookGraphAPI() {
    window.FB.login(function (response) {
      if (response.status === 'connected') {
        getPageToken()
        // alert('Logged successfully')
        // Logged into your webpage and Facebook.
      } else {
        alert('Error when logging on Facebook')
        // The person is not logged into your webpage or we are unable to tell. 
      }
    }, { scope: 'public_profile,email,pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,pages_manage_engagement' });
  }

  // async function signInTikTok() {
  //   alert('sd')
  // }

  function verifyImage(data) {
    if(typeof data.attachments.data !== 'undefined') {
      return (
        <Image
          style={{width: '70%', height: '5%'}}
          borderRadius="lg"
          objectFit="contain"
          src={data.attachments.data[0].media.image.src}
          alt="Page's Picture"
        />
        );
    } else {
      return null;
    }
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
      <Modal size={"3xl"} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Facebook Pages</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {pageInformation.map((item) =>
              <Flex onClick={() => [setIsOpen3(true), getPagePosts(item.id, item.access_token)]} flexDirection={'column'}>
                <Flex flexDirection={'row'} alignItems="center" marginBottom={15}>
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


      <Modal isOpen={isOpen2} onClose={() => setIsOpen2(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Your Platform</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'row'} align="center" justify='center'>
              {/* <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: "brightness(120%)", bg: bgIcons }}>
                <Button onClick={() => signInTikTok()} h={55} href='#'>
                  <Icon
                    as={FaTiktok}
                    w='30px'
                    h='30px'
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Button>
              </Flex> */}
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: "brightness(120%)", bg: bgIcons }}>
                <Button onClick={() => signInFacebookGraphAPI()} h={55} href='#'>
                  <Icon
                    as={FaFacebook}
                    w='30px'
                    h='30px'
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={() => setIsOpen2(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Modal size='3xl' isOpen={isOpen3} onClose={() => setIsOpen3(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Page's Posts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {pagePosts.map((item) =>
              <Flex onClick={() => setIsOpen3(true)} flexDirection={'column'}>
                <Flex flexDirection={'column'} alignItems="center" marginBottom={15}>
                  <Text key={item.id} marginLeft={7} marginTop={7} fontSize='medium' color='gray.500' fontWeight='100'>
                    {item.story}
                  </Text>
                  {verifyImage(item)}
                  <Text key={item.id} paddingLeft={10} paddingRight={10} alignSelf="center" textAlign={"justify"} marginRight={3} marginTop={10} fontSize='medium' color='white.500' fontWeight='400'>
                    {item.message}
                  </Text>
                  <Button colorScheme="teal" mr={3} marginTop={3} onClick={() => window.open(item.permalink_url)}>
                    Go to Post
                  </Button>
                </Flex>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={() => setIsOpen3(false)}>
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
            <Button onClick={() => {pageInformation.length !== 0 ? setIsOpen(true) : setIsOpen2(true)}} p='0px' bg='transparent' _hover={{ bg: "none" }}>
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
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
