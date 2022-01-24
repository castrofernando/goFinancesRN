import styled,{css} from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

interface TypeProps{
    type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    background-color: ${(props) => props.type === 'total' ? theme.colors.secundary : theme.colors.shape};
    margin-right: 16px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;

`;
export const Title = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${(props) => props.type === 'total' ? theme.colors.shape : theme.colors.text};
`;
export const Icon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(40)}px;
    color: ${({theme}) => theme.colors.success_light};
    
    ${(props) => props.type === 'up' && css`
        color: ${({theme})=> theme.colors.success};
    `};

    ${(props) => props.type === 'down' && css`
        color: ${({theme})=> theme.colors.attention};
    `};

    ${(props) => props.type === 'total' && css`
        color: ${({theme})=> theme.colors.shape};
    `};
`;
export const Footer = styled.View`

`;
export const Amount = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    color: ${(props) => props.type === 'total' ? theme.colors.shape : theme.colors.text};
    margin-top: 38px;
`;
export const LastTransaction = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${(props) => props.type === 'total' ? theme.colors.shape : theme.colors.text};
`;
