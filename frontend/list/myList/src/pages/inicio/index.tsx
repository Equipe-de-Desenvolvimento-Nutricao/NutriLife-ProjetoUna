import React from "react";

import * as Animatable from 'react-native-animatable';

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    
} from 'react-native';

import Logo from '../../assets/logo2.png';

import { style } from "./styles";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';
type InicioScreenProp = NativeStackNavigationProp<RootStackParamList, 'Inicio'>;

export default function Inicio(){
    
    const navigation = useNavigation<InicioScreenProp>();
    return(
        <View style={style.container}>
            
            <View style={style.containerLogo}>
                <Animatable.Image 
                    animation="flipInY"
                    source={Logo}
                    style={{ width:'100%'}}
                    resizeMode="contain"
                 />  
            </View> 

            <Animatable.View delay={600} animation="fadeInUp" style={style.containerForm}>
                <Text style={style.title}>Melhore seu desempenho com uma nutrição adequada!</Text>
                <Text style={style.text}>Faça o login para comecar</Text>

                <TouchableOpacity 
                style={style.button}
                onPress={ ()=> navigation.navigate('Login')}
                >
                    <Text style={style.buttonText}>Acessar</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View>
    )

}

