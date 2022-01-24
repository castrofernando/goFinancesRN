import React from 'react';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import theme from './src/global/styles/theme';

import {StatusBar} from 'react-native';


import {AuthProvider, useAuth} from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageloading } = useAuth();

  if(!fontsLoaded || userStorageloading){
    return <AppLoading/> //Aqui segura até carregar as fontes....
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle='light-content'/>
        <AuthProvider >
          <Routes/>
        </AuthProvider>


    </ThemeProvider>
  )
}

