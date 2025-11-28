import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import * as Animatable from "react-native-animatable";
import { style } from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";

type ResultadoGetRouteProp = RouteProp<RootStackParamList, "ResultadoGet">;
type ResultadoGetNavigationProp = NativeStackNavigationProp<RootStackParamList, "ResultadoGet">;

export default function ResultadoGet() {
  const route = useRoute<ResultadoGetRouteProp>();
  const navigation = useNavigation<ResultadoGetNavigationProp>();

  const { sexo, peso, altura, idade, atividade, tmb, manter, emagrecer, ganhar } = route.params;

  const salvarPaciente = () => {
    navigation.navigate("SalvarPaciente", {
      sexo,
      peso,
      altura,
      idade,
      atividade,
      tmb,
      manter,
      emagrecer,
      ganhar,
    });
  };

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
          onPress={salvarPaciente}
        >
          <Text style={style.buttonTextSave}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}