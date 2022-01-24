import React from "react";
import { categories } from "../utils/categories";
import {
    Container,
    Description,
    Amount,
    TransactionInfo,
    Category,
    CategoryIcon,
    CategoryName,
    TransactionDate,
} from './styles';

interface Category{
    name: string,
    icon: string
}

export interface TransactionCardProps{
    type: 'positive' | 'negative',
    name: string,
    amount: string,
    category: string,
    date: string,
}

interface Data{
    data:TransactionCardProps;
}

export function TransactionCard({data}: Data){
    const category = categories.filter(
        item => item.key === data.category
    )[0];
    return (
        <Container>
            <Description>{data.name}</Description>
            <Amount type={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
                </Amount>
            <TransactionInfo>
                <Category>
                    <CategoryIcon name={category.icon}/>
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <TransactionDate>
                    {data.date}
                </TransactionDate>
            </TransactionInfo>
        </Container>
    )
}