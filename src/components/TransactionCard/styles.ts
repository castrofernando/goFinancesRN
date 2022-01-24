import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import {RFPercentage,RFValue} from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

interface TransactionProps{
   type: 'positive' | 'negative'
}

export const Container = styled.View`
   width: ${RFValue(327)}px;
   background: ${({theme})=> theme.colors.shape};
   border-radius: 5px;
   padding:18px 24px;
   margin:16px 0px;
`;

export const Description = styled.Text`
   font-family: ${({theme}) => theme.fonts.regular};
   font-size: ${RFValue(14)}px};
   color: ${({theme}) => theme.colors.title};
`;

export const Amount = styled.Text<TransactionProps>`
   font-family: ${({theme}) => theme.fonts.regular};
   font-size: ${RFValue(20)}px};
   color: ${({theme, type}) => type==='positive'? theme.colors.success : theme.colors.attention};`;
   
export const TransactionInfo = styled.View`
   flex-direction: row;
   align-items: flex-end;
   justify-content: space-between;
`;
export const Category = styled.View`
   flex-direction: row;
   align-items: center;
   padding-top: 19px;
`;
export const CategoryIcon = styled(Feather)`
   padding-right:17px;
   font-family: ${({theme}) => theme.fonts.regular};
   font-size: ${RFValue(20)}px};
   color: ${({theme}) => theme.colors.text};
`;

export const CategoryName = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
   font-size: ${RFValue(14)}px};
   color: ${({theme}) => theme.colors.text};
`;

export const TransactionDate = styled.Text`
 font-family: ${({theme}) => theme.fonts.regular};
   font-size: ${RFValue(14)}px};
   color: ${({theme}) => theme.colors.text};
`;