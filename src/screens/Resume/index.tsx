import React, {useCallback, useEffect, useState} from "react";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import {useTheme} from 'styled-components';
import { addMonths,format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer,
} from './styles';
import { categories } from "../../components/utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useAuth } from "../../hooks/auth";

interface TransactionData{
    type: 'positive' | 'negative',
    name: string,
    amount: string,
    category: string,
    date: string,
}

interface CategoryData{
    key: string;
    name: string;
    totalFormatted: string;
    total: number;
    color: string;
    percent: string;
}

export function Resume(){
    const theme = useTheme();
    const {user} =useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate,setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

    function handleDateChange(action: 'next' | 'prev'){
        if(action === 'next'){
            const newDate = addMonths(selectedDate, 1);
            setSelectedDate(newDate);
        }else{
            const newDate = addMonths(selectedDate, -1);
            setSelectedDate(newDate);
        }
    }

    async function loadData(){   
        setIsLoading(true);
        const dataKey = `@goFinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
            .filter((expensive : TransactionData) => 
            expensive.type === 'negative' && 
            new Date(expensive.date).getMonth() === selectedDate.getMonth() && 
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear());
        console.log(expensives);

        const expensiveTotal = expensives.reduce((acumullator : Number, expensive:TransactionData) => {
            return acumullator + Number(expensive.amount);
        },0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive :TransactionData)=> {
                if(expensive.category === category.key){
                    categorySum+=Number(expensive.amount);
                }
            });
            if(categorySum>0){
                const total = categorySum.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'});

                const percent = (categorySum / expensiveTotal * 100).toFixed(0);

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    totalFormatted: total,
                    total: categorySum,
                    color: category.color,
                    percent: `${percent}%`
                });
            }
           
        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(()=>{
      loadData();
    },[selectedDate]));

    return (
        <Container>

        {          
            isLoading ? 
            <LoadContainer>
                <ActivityIndicator 
                color={theme.colors.primary} size="large"/>
            </LoadContainer> : 
            <>
            <Header>
                <Title>Resumo</Title>
            </Header>

            <MonthSelect>
                        <MonthSelectButton onPress={()=> {handleDateChange('prev')}}>
                            <MonthSelectIcon name="chevron-left"/>
                        </MonthSelectButton>

                        <Month> 
                            { format(selectedDate,'MMMM ,yyyy', { locale: ptBR}) }
                        </Month>

                        <MonthSelectButton onPress={()=> {handleDateChange('next')}}>
                            <MonthSelectIcon name="chevron-right"/>
                        </MonthSelectButton>
            </MonthSelect>

            <Content 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={ false }
                contentContainerStyle= {{flexGrow:1, paddingHorizontal: 24, paddingBottom: useBottomTabBarHeight()}}   
            >

                <ChartContainer>
                    <VictoryPie
                    data={totalByCategories}
                    colorScale={totalByCategories.map(category => category.color)}
                    style={{
                        labels: { 
                            fontSize: RFValue(18), 
                            fontWeight: 'bold',    
                            fill: theme.colors.shape                       
                        }
                    }}
                    labelRadius={50}
                    x="percent"
                    y="total"
                    />
                </ChartContainer>

                { 
                totalByCategories.map(item=> (<HistoryCard 
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                    key={item.key}
                    />
                ))
                }
            </Content>
          </>
        }
                
        </Container>
    )
}