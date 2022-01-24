import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
    width: 100%;
    padding: 18px;
    background-color: ${({theme}) => theme.colors.secundary};
    align-items: center;
    border-radius: 5px;
    margin-bottom: 8px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme})=> theme.colors.background};
`;