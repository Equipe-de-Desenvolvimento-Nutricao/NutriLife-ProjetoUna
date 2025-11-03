import React, { useState } from "react";

import * as Animatable from 'react-native-animatable';

import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';

import { style } from "./styles"
import Logo from '../../assets/logo2.png'
import {MaterialIcons} from "../../../node_modules/expo/node_modules/@expo/vector-icons"
import { themas } from "../../global/themes";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login (){
    const navigation = useNavigation<LoginScreenProp>();
    const [login,setLogin] = useState('')
    const [senha,setSenha] = useState('')


    const handleLogin = async () => {
    if (!login || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const usuarios = await AsyncStorage.getItem('usuarios');
      const lista = usuarios ? JSON.parse(usuarios) : [];

      const usuarioEncontrado = lista.find(
        (u: {
            usuario: string; email: string; senha: string; 
            }) => (u.email === login || u.usuario === login) && u.senha === senha
      );

      if (usuarioEncontrado) {
        Alert.alert('Bem-vindo!', 'Login realizado com sucesso!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'E-mail/Usuario ou senha incorretos.');
      }
    } catch (e) {
      Alert.alert('Erro', 'Falha ao fazer login.');
      console.error(e);
    }
  };

    return (
        <View style = {style.container}>
            <View style={style.boxTop}>
                <Animatable.Image
                    animation="fadeInLeft"
                    delay={500}
                    source={Logo}
                    style={style.logo}
                    resizeMode="contain"
                />
                <Animatable.Text animation="fadeIn" delay={500} style={style.text}>Bem vindo de volta!</Animatable.Text>

            </View>
            
            <Animatable.View animation="fadeInUp" style={style.boxMid}>
                <Text style={style.titleInput}>ENDEREÇO DE E-MAIL OU USUARIO</Text>
                <View style={style.BoxInput}>
                <TextInput
                    style={style.input}
                    value={login}
                    onChangeText={setLogin}
                    />
                <MaterialIcons
                    name='email'
                    size={20}
                    color={themas.colors.gray}
                />
                </View>
                <Text style={style.titleInput}>SENHA</Text>
                <View style={style.BoxInput}>
                <TextInput
                    style={style.input}
                    value={senha}
                    onChangeText={setSenha}
                    />
                <MaterialIcons
                    name='remove-red-eye'
                    size={20}
                    color={themas.colors.gray}
                />
                </View>
                <TouchableOpacity style={style.button} onPress={()=>handleLogin()}>                    
                            <Text style={style.textButton}>ENTRAR</Text>                   
                </TouchableOpacity>
                
             </Animatable.View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={style.textButtom}>Não tem conta ?  
                        <Text style={{color:themas.colors.primary}}> Ir para Cadastro</Text></Text>
                </TouchableOpacity>             
        </View>
    )
}
