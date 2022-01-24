import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled(RectButton)`
    flex-direction: row;
    width: 100%;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    align-items:center;
    margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
    padding: ${RFValue(16)}px;
    justify-content: center;
    align-items: center;
    border-right-width: 1px;
    border-right-color: ${({theme})=> theme.colors.background};
`;
export const Text = styled.Text`
    flex:1;
    text-align: center;
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme})=> theme.colors.title};
`;