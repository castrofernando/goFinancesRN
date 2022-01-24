import { createContext,ReactNode, useContext, useState } from "react";

import { useEffect } from "react";
import { CLIENT_ID, REDIRECT_URI } from 'react-native-dotenv';

import * as AuthSession from 'expo-auth-session'; // Google
import * as AppleAuthentication from 'expo-apple-authentication'; //Apple

import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData{
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageloading: boolean;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    }
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);



function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<User>({} as User);
    const [userStorageloading, setUserStorageLoading] = useState(true);
    const userStoragedKey = '@gofinances:user';

    async function signInWithGoogle() {
        try{
            //await console.log(CLIENT_ID);
            //await console.log(REDIRECT_URI);
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
            
            //endpoint de autenticação da google
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const {type, params} = await AuthSession.startAsync({ authUrl}) as AuthorizationResponse;
            if(type==='success'){
                //console.log(params.access_token);
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                const userData = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture,
                };
                setUser(userData);
                await AsyncStorage.setItem(userStoragedKey, JSON.stringify(userData));
            }   
        }catch(error){
            throw new Error(error);
        }
    }
    
    async function signInWithApple(){
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });
            if(credential){
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName!.givenName!,
                    photo: undefined
                }
                setUser(userLogged);
                await AsyncStorage.setItem(userStoragedKey, JSON.stringify(userLogged));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userStoragedKey);
    }
    
    useEffect(()=>{
        async function loadUserStorageData(){
            const userStoraged = await AsyncStorage.getItem(userStoragedKey);
            if(userStoraged){
                const userLogged = await JSON.parse(userStoraged) as User;
                setUser(userLogged);  
                console.log(userStoraged);         
            }
            setUserStorageLoading(false);
        }

        loadUserStorageData();
    },[]);

    return (
        <AuthContext.Provider value={{
            user: user,
            signInWithGoogle,
            signInWithApple,   
            signOut,    
            userStorageloading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth}