import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {SvgUri} from 'react-native-svg'; // SVG Package

export const Container = styled.View`
    flex:1;
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({theme})=> theme.colors.primary};
    padding-top: 20%;
    align-items: center;
`;

export const AppDescription = styled.Text`
    font-family: ${({theme})=> theme.fonts.medium};
    color: ${({theme})=> theme.colors.shape};
    font-size: ${RFValue(30)}px;
    width: ${RFValue(279)}px;
    text-align: center;
    margin-top:  ${RFValue(45)}px;
    margin-bottom: ${RFValue(45)}px;
`;

export const LoginDescription = styled.Text`
    font-family: ${({theme})=> theme.fonts.regular};
    color: ${({theme})=> theme.colors.shape};
    font-size: ${RFValue(16)}px;
    width: ${RFValue(200)}px;
    text-align: center;
`;

export const Footer = styled.View`
    flex:1;
    width: 100%;
    background-color: ${({theme})=> theme.colors.secundary};
    align-items: center;
`;

export const ImageContainer = styled.View`
    background-color: ${({theme})=> theme.colors.shape};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right-width: 1px;
    border-right-color: ${({theme})=> theme.colors.text};
    align-items: center;
    justify-content: center;
    padding: 18px;
    border-radius: 10px;
`;


export const ButtonGoogle = styled.View`
    width: 80%;
    align-items: center;
    flex-direction: row;
    align-items: center;
    background-color: ${({theme})=> theme.colors.shape};
    margin-bottom: 16px;
    border-radius: 10px;
`;

export const ButtonGoogleText = styled.Text`
    padding:18px 0px;
    font-family: ${({theme})=> theme.fonts.regular};
    color: ${({theme})=> theme.colors.title};
    font-size: ${RFValue(14)}px;
    padding-left: 30px;
`;

export const ButtonApple = styled.View`
    width: 80%;
    justify-content: flex-start;
    align-items: center;

    flex-direction: row;
    background-color: ${({theme})=> theme.colors.shape};
    border-radius: 10px;
`;

export const ButtonAppleText = styled.Text`
    padding:18px 0px;
    font-family: ${({theme})=> theme.fonts.regular};
    color: ${({theme})=> theme.colors.title};
    font-size: ${RFValue(14)}px;
    padding-left: 30px;
`;

export const ButtonsWrapper = styled.View`
    width: 100%;
    align-items: center;
    margin-top: ${RFPercentage(-4)}px;
    padding: 0px 24px;
`;