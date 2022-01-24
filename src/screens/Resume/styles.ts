import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import { Feather} from '@expo/vector-icons';
import { BorderlessButton, RectButton } from "react-native-gesture-handler";


export const Container = styled.View`
    flex:1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${({theme}) => RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const Content = styled.ScrollView`

`;

export const ChartContainer = styled.View`
   width: 100%;
   align-items: center;
`;


export const MonthSelect = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;
    padding: 0px 24px;
`;
export const MonthSelectButton = styled(BorderlessButton)`
`;
export const MonthSelectIcon = styled(Feather)`
    font-size: ${({theme}) => RFValue(24)}px;
    color: ${({theme}) => theme.colors.text};
    padding: 20px;
`;
export const Month = styled.Text`
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${({theme}) => RFValue(20)}px;
    color: ${({theme}) => theme.colors.text};
`;

export const LoadContainer = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
`;