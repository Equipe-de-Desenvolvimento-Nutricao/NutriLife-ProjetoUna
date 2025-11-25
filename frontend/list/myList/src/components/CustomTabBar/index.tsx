import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {AntDesign,FontAwesome,Ionicons} from "../../../node_modules/expo/node_modules/@expo/vector-icons"
import { themas } from "../../global/themes";



export default function TabBar({ state, descriptors, navigation, insets }: BottomTabBarProps){
    return(
        <View style={style.tabArea}>
            <TouchableOpacity style={style.botton} onPress={() => navigation.navigate('Imc')}>
                <Text style={style.tabText}>IMC</Text>             
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItemButtom} onPress={() => navigation.navigate('Home')}>
                <FontAwesome
                         name="home"
                         style={{fontSize:40}}                 
                    />
            </TouchableOpacity>
            <TouchableOpacity style={style.botton} onPress={() => navigation.navigate('Get')}>
                <Text style={style.tabText}>GET</Text>
            </TouchableOpacity>
        </View>
    );
}
