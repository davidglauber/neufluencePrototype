import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

// Assets
import signInImage from "assets/img/signInImage.png";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "api/firebase";
import { FaFacebook, FaGoogle } from "react-icons/fa";

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

  const navigate = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('User logged successfully', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    })
    navigate.push('/admin/dashboard');

    if (email !== '' && password !== '') {
      try {
        toast.success('User logged successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        })
        await signInWithEmailAndPassword(auth, email, password);
        navigate.push('/admin/dashboard');
      } catch (err) {
        console.error(err);
        toast.error(err.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    }
  }

  async function signInWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged In!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      navigate.push('/admin/dashboard');
    } catch (err) {
      console.error(err);
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  }

  async function signInWithFacebook() {
    const facebookProvider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, facebookProvider);
      toast.success('Logged In!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      navigate.push('/admin/dashboard');
    } catch (err) {
      console.error(err);
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  }

  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none", marginTop: 40 }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Welcome Back
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
              Enter your email and password to sign in
            </Text>

            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Email
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='email'
                value={email}
                onChange={(text) => setEmail(text.target.value)}
                placeholder='Your email adress'
                size='lg'
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Password
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                value={password}
                onChange={(text) => setPassword(text.target.value)}
                placeholder='Your password'
                size='lg'
              />

              <Flex direction={'row'} align="center" justify='center'>

                <Flex
                  justify='center'
                  align='center'
                  w='75px'
                  h='75px'
                  borderRadius='15px'
                  cursor='pointer'
                  transition='all .25s ease'
                  _hover={{ filter: "brightness(120%)", bg: bgIcons }}>
                  <Button onClick={() => signInWithFacebook()} h={55} href='#'>
                    <Icon
                      as={FaFacebook}
                      w='30px'
                      h='30px'
                      _hover={{ filter: "brightness(120%)" }}
                    />
                  </Button>
                </Flex>
                <Flex
                  justify='center'
                  align='center'
                  w='75px'
                  h='75px'
                  borderRadius='15px'
                  cursor='pointer'
                  transition='all .25s ease'
                  _hover={{ filter: "brightness(120%)", bg: bgIcons }}>
                  <Button onClick={() => signInWithGoogle()} h={55} href='#'>
                    <Icon
                      as={FaGoogle}
                      w='30px'
                      h='30px'
                      _hover={{ filter: "brightness(120%)" }}
                    />
                  </Button>
                </Flex>
              </Flex>
              <Button
                onClick={() => login()}
                fontSize='10px'
                type='submit'
                bg='teal.300'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}>
                SIGN IN
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Button color={titleColor} onClick={() => navigate.push('/auth/signup')} as='span' ms='5px' fontWeight='bold'>
                  Sign Up
                </Button>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'>
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'></Box>
        </Box>
      </Flex>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Flex>
  );
}

export default SignIn;
