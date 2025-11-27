import React from "react";

import { Text } from "react-native";
import { View } from "react-native-animatable";
import { style } from "./styles";

export default function Home (){
    return(
        <View style={style.fundo}>
            <Text>Ola mundo</Text>

        </View>
    
    )
}