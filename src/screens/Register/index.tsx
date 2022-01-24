import React, {useEffect, useState} from "react";
import { TouchableWithoutFeedback } from "react-native"; 
import {Keyboard, Modal,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

import uuid from 'react-native-uuid';


import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
} from './styles'
import { Input } from '../../components/Form/Input';
import { InputForm } from '../../components/Form/InputForm';
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { useAuth } from "../../hooks/auth";

interface FormData {
    name: string,
    amount: string
}


const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
});

export function Register(){
    const { user } = useAuth();
    const dataKey = `@goFinances:transactions_user:${user.id}`;

    const navigation :NavigationProp<ParamListBase> = useNavigation();

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(()=>{
        async function loadData(){
            const data = await AsyncStorage.getItem(dataKey);
            console.log(JSON.parse(data!));
        }
        loadData();

        async function removeAll(){
            await AsyncStorage.removeItem(dataKey);
        }
        //removeAll();
    },[]);

    async function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('selecione o tipo da transação');
        if(category.key === 'category')
            return Alert.alert('Selecione a categoria');
        
        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        };

        try{
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormatted = [
                ...currentData,
                newTransaction
            ];
            await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));
            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem');

        }catch(error){
            console.log(error);
            Alert.alert('Não foi possível salvar transação');
        }

    }

    function handleTransactionsTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
            <Form>
                <Fields>
                    <InputForm 
                        name="name" 
                        control={control} 
                        placeholder="Nome" 
                        autoCapitalize="sentences" 
                        autoCorrect={false}
                        error={errors.name && errors.name.message}/>
                    <InputForm 
                        name="amount" 
                        control={control} 
                        placeholder="Preço" 
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}/>
                    <TransactionsTypes>
                        <TransactionTypeButton 
                            type="up" 
                            title="Income"
                            onPress={() => handleTransactionsTypeSelect('positive')}
                            isActive={transactionType==='positive'} 
                        />
                        <TransactionTypeButton 
                            type="down" 
                            title="Outcome"
                            onPress={() => handleTransactionsTypeSelect('negative')}
                            isActive={transactionType==='negative'}
                        />
                    </TransactionsTypes>

                    <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}/>
                </Fields>
                <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>

            </Container>
        </TouchableWithoutFeedback>
    );
}