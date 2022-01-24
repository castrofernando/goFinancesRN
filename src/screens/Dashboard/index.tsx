import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard,TransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import {useTheme} from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { useNavigation } from "@react-navigation/native";

import { 
    Container,
    Header,
    UserInfo,
    UserWrapper,
    Photo,
    User,
    UserGreeting,
    UserName,
    LogoutButton,
    Icon,
    HighlightCards,
    Transactions,
    TransactionTitle,
    TransactionList,
    LoadContainer,
    ImageApple,
    TextApple
} from './styles';

export interface DataListProps extends TransactionCardProps{
  id: string;
}

interface HighlightDataProps{
  amount: string;
  lastTransaction: string;
}

interface HighlightData{
  entries: HighlightDataProps,
  expensives: HighlightDataProps,
  totalAvailable: HighlightDataProps
}

export function Dashboard(){
    const {signOut, user} = useAuth();
    const theme = useTheme();

    const [isLoading,setIsLoading] = useState(true);
    const [transactions,setTransactions] = useState<DataListProps[]>([]);
    const [highlightData,setHighlightData] = useState<HighlightData>();
    const [firstLetterName, setFirstLetterName] = useState('');

    function getFirstLetterName(){
      if(user.name){
        const data = user.name;
        const first = data.charAt(0);
        const pos = data.indexOf(' ');
        const second = data.charAt(pos+1);
        setFirstLetterName(`${first}${second}`);
        console.log(firstLetterName);
        return;
      }else{
        setFirstLetterName('=]');
        return;
      }

    }
    
    function getLastTransactionDate(collection: DataListProps[], type : 'positive' | 'negative'){
      
      const collectionFiltered = collection
      .filter((transaction ) => transaction.type === type);

      if(collectionFiltered.length===0){
        return 0;
      }
      
      const lastTransaction = new Date(Math.max.apply(Math,collectionFiltered
        .map((transaction) =>  new Date(transaction.date).getTime())));

        return `${lastTransaction.getDate()} die ${lastTransaction.toLocaleString('pt-BR',{ month: 'long'})}`;
    }

    async function loadTransactions(){

      let entriesSum = 0;
      let expensiveSum = 0;
  
      const dataKey = `@goFinances:transactions_user:${user.id}`;
      const response = await AsyncStorage.getItem(dataKey);
      const transactionsData = response ? JSON.parse(response) : [];

      const transactionsFormatted: DataListProps[] = transactionsData
      .map((item: DataListProps) => {

        if(item.type==='negative'){
          expensiveSum +=Number(item.amount);
        }else{
          entriesSum+=Number(item.amount);
        }        

        const amount = Number(item.amount)
        .toLocaleString('pt-BR',{ 
            style: 'currency', 
            currency: 'BRL'
          });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      });
      setTransactions(transactionsFormatted);

      const lastTransactionsEntries = getLastTransactionDate(transactionsData, 'positive');
      const lastTransactionsExpensives = getLastTransactionDate(transactionsData, 'negative');
      const totalInterval = `01 a ${lastTransactionsExpensives}`

      setHighlightData({
        entries: {
          amount: Number(entriesSum).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'}),
          lastTransaction: lastTransactionsEntries === 0? 'Não há transações' : `Última entrada ${lastTransactionsEntries}`,
        },
        expensives: {
          amount: Number(expensiveSum).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'}),
          lastTransaction: lastTransactionsExpensives === 0? 'Não há transações' : `Última saída ${lastTransactionsExpensives}`,
        },
        totalAvailable: {
          amount: Number(entriesSum - expensiveSum).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'}),
          lastTransaction: lastTransactionsExpensives === 0 && lastTransactionsEntries == 0? 'Não há transações' : totalInterval,
        }
      });
      
      setIsLoading(false);
    }

    useEffect(()=>{

    },[]);

    useFocusEffect(useCallback(()=>{
      loadTransactions();
      getFirstLetterName();
    },[]));

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
              <UserWrapper>
                <UserInfo>
                  {
                    user.photo?  <Photo source={{uri : user.photo }}/> : <ImageApple><TextApple>{firstLetterName}</TextApple></ImageApple>
                  }
                 
                  <User>
                    <UserGreeting>Olá</UserGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo> 
                <LogoutButton onPress={signOut}>
                  <Icon name={'power'}/>
                </LogoutButton>
              </UserWrapper>   
            </Header>

            <HighlightCards >
              <HighlightCard 
                type='up'
                title='Entradas'
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}/>  
              <HighlightCard
                type='down'
                title='Saídas'
                amount={highlightData.expensives.amount}
                lastTransaction={highlightData.expensives.lastTransaction}/>
              <HighlightCard
                type='total'
                title='Total'
                amount={highlightData.totalAvailable.amount}
                lastTransaction={highlightData.totalAvailable.lastTransaction}/>
            </HighlightCards>
            
              <Transactions>
                <TransactionTitle>Listagem</TransactionTitle>
    
                <TransactionList
                  data={transactions}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => <TransactionCard data={item} />}
              
                />
    
              </Transactions>   
          </>
        }    
      </Container>
    )
}

