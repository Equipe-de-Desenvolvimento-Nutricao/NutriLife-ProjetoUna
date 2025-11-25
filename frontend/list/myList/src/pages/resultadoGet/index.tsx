import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { style } from "./styles";
import { FontAwesome5 } from "../../../node_modules/expo/node_modules/@expo/vector-icons";

type Params = {
  ResultadoGet: {
    tmb: string;
    manter: string;
    emagrecer: string;
    ganhar: string;
  };
};

export default function ResultadoGet() {
  const route = useRoute<RouteProp<Params, "ResultadoGet">>();
  const navigation = useNavigation();

  const { tmb, manter, emagrecer, ganhar } = route.params;

  return (
    <Animatable.View animation="fadeInUp" duration={800} style={style.container}>

      <Animatable.Text animation="fadeIn" delay={200} style={style.title}>
        Resultado GET
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" delay={300} style={style.card}>
        <View style={style.row}>
          <FontAwesome5 name="fire" size={22} color="#00bd58" />
          <Text style={style.label}>Metabolismo Basal</Text>
        </View>
        <Text style={style.value}>{tmb} kcal</Text>

        <View style={style.row}>
          <FontAwesome5 name="balance-scale" size={22} color="#00bd58" />
          <Text style={style.label}>Manter peso</Text>
        </View>
        <Text style={style.value}>{manter} kcal</Text>

        <View style={style.row}>
          <FontAwesome5 name="arrow-down" size={22} color="#00bd58" />
          <Text style={style.label}>Para emagrecer</Text>
        </View>
        <Text style={style.value}>{emagrecer} kcal</Text>

        <View style={style.row}>
          <FontAwesome5 name="arrow-up" size={22} color="#00bd58" />
          <Text style={style.label}>Para ganhar peso</Text>
        </View>
        <Text style={style.value}>{ganhar} kcal</Text>
      </Animatable.View>

      <View style={style.buttonArea}>
        <TouchableOpacity
          style={style.buttonBack}
          onPress={() => navigation.goBack()}
        >
          <Text style={style.buttonTextBack}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.buttonSave}
          onPress={() => alert("Resultado salvo!")}
        >
          <Text style={style.buttonTextSave}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}
