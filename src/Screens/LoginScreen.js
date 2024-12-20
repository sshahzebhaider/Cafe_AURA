import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Features/loginSlice';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from '@chakra-ui/react';

import backgroundImg from '../assets/images/black.jpg'; // Update the path to your actual image

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const employeeLogin = useSelector(store => store.employeeLogin);
  const { loading, error, employeeInfo } = employeeLogin;

  const handleLogin = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (employeeInfo && redirect === '/') {
      navigate('/dashboard');
    } else if (employeeInfo && redirect) {
      navigate(`/${redirect}`);
    }
  }, [employeeInfo, navigate, redirect]);

  return (
    <Center
      height="100vh"
      bgImage={`url(${backgroundImg})`} // Set background image here
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        width="300px"
        p="6"
        bg="rgba(255, 255, 255, 255)" // Set background color with transparency
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Heading as="h1" marginBottom="2rem" color="#be2ed6">
          CAFE AURA
        </Heading>
        <FormControl marginBottom="1rem">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          onClick={handleLogin}
          marginBottom="1rem"
          width="100%"
        >
          {loading ? <Spinner /> : 'Login'}
        </Button>
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}{' '}
          </Alert>
        )}
      </Box>
    </Center>
  );
};

export default LoginScreen;
