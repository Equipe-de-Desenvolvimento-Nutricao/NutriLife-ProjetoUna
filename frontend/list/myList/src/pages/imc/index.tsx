import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { View } from "react-native-animatable";
import { FontAwesome5 } from "../../../node_modules/expo/node_modules/@expo/vector-icons";
import { style } from "./styles";
import { themas } from "../../global/themes";

export default function Imc() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState("");

  function calcularIMC() {
    if (!peso || !altura) {
      setResultado("Preencha os campos");
      return;
    }

    const pesoNum = Number(peso.replace(",", "."));
    const alturaNum = Number(altura.replace(",", ".")) / 100;

    if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum === 0) {
      setResultado("Valores inválidos");
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    const imcFormatado = imc.toFixed(2);

    let classificacao = "";
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 24.9) classificacao = "Peso normal";
    else if (imc < 29.9) classificacao = "Sobrepeso";
    else if (imc < 34.9) classificacao = "Obesidade I";
    else if (imc < 39.9) classificacao = "Obesidade II";
    else classificacao = "Obesidade III";

    setResultado(`${imcFormatado} — ${classificacao}`);
  }

  function limpar() {
    setPeso("");
    setAltura("");
    setResultado("");
  }

  return (
    <View style={style.container}>
        <Animatable.View
          animation="fadeInDown"
          duration={700}
          style={style.headerArea}
        >
          <Text style={style.headerTitle}>IMC</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={700} style={style.body}>
          <Text style={style.label}>PESO (kg)</Text>
          <View style={style.inputRow}>
            <TextInput
              value={peso}
              onChangeText={setPeso}
              placeholder="Ex: 72"
              placeholderTextColor="#9e9e9e"
              keyboardType="numeric"
              style={style.input}
            />
            <FontAwesome5 name="weight-hanging" size={18} style={style.icon} />
          </View>

          <Text style={style.label}>ALTURA (cm)</Text>
          <View style={style.inputRow}>
            <TextInput
              value={altura}
              onChangeText={setAltura}
              placeholder="Ex: 175"
              placeholderTextColor="#9e9e9e"
              keyboardType="numeric"
              style={style.input}
            />
            <FontAwesome5 name="ruler-vertical" size={18} style={style.icon} />
          </View>

          <Animatable.View animation="fadeIn" delay={200} style={style.card}>
            <Text style={style.cardTitle}>Seu Resultado</Text>
            <Text style={style.cardResult}>
              {resultado ? resultado : "Aguardando cálculo"}
            </Text>
          </Animatable.View>

          <View style={style.buttonsRow}>
            <TouchableOpacity style={style.buttonPrimary} onPress={calcularIMC}>
              <Text style={style.buttonPrimaryText}>CALCULAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.buttonSecondary} onPress={limpar}>
              <Text style={style.buttonSecondaryText}>LIMPAR</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
    </View>
  );
}
