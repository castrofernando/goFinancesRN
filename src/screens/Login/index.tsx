import React, { useEffect } from "react";

import {
    Container,
    Header,
    AppDescription,
    LoginDescription,
    Footer,
    ButtonsWrapper,
    ImageContainer,
    ButtonGoogle,
    ButtonGoogleText,
    ButtonApple,
    ButtonAppleText,
} from './styles';

import LogoSvg from '../../assets/logo.svg';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";

import AsyncStorage from '@react-native-async-storage/async-storage';


import {useAuth} from '../../hooks/auth';
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useState } from "react";
import theme from "../../global/styles/theme";

export function Login(){
    const {signInWithGoogle, signInWithApple} = useAuth();
    const [isLoading,setIsLoading] = useState(false);

    async function handleSignInWithGoogle(){
        try{
            setIsLoading(true);
            return await signInWithGoogle();
        }catch(error){
            console.log(error);
            Alert.alert('Falha ao autenticar com google');
            setIsLoading(false);
        }
    }



    async function handleSignInWithApple(){
        try{
            setIsLoading(true);
            return await signInWithApple();
        }catch(error){
            console.log(error);
            Alert.alert('Falha ao autenticar com apple');
            setIsLoading(false);
        }
    }
    
    return (
        <Container>
            <Header>
                <LogoSvg 
                    width={RFValue(120)}
                    height={RFValue(68)}/>
                <AppDescription>Controle suas finanças de forma muito simples</AppDescription>
                <LoginDescription>Faça seu login com uma das contas abaixo</LoginDescription>
            </Header>
            <Footer>
                <ButtonsWrapper>
                    <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />
                    {
                        Platform.OS === 'ios' &&
                        <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={handleSignInWithApple} />
                        
                    }
                </ButtonsWrapper>  

                {
                    isLoading && <ActivityIndicator color={theme.colors.primary} size='large' />
                }             
            </Footer>
        </Container>
    );
}