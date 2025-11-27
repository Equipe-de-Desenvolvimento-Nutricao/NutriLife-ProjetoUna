import React, { useState } from "react";

import * as Animatable from "react-native-animatable";

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { style } from "./styles";
import Logo from "../../assets/logo2.png";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { api } from "../../services/api";

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function Login() {
  const navigation = useNavigation<LoginScreenProp>();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    console.log("🔵 Tentando fazer login...");
    console.log("Dados:", { email: login, senha });
    
    if (!login || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    console.log("✅ Campos preenchidos");
    console.log("🚀 Enviando para o servidor...");

    try {
      const response = await api.post("/nutricionistas/login", {
        email: login,
        senha: senha,
      });

      console.log("✅ Resposta do servidor:", response.data);
      Alert.alert("Sucesso", "Login realizado!");
      navigation.navigate("Home");

    } catch (error: any) {
      console.log("❌ Erro na requisição:", error);
      console.log("📋 Detalhes do erro:", error.response?.data);
      console.log("🔢 Status:", error.response?.status);
      Alert.alert("Erro", error.response?.data || "Falha ao conectar ao servidor.");
    }
  };

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Animatable.Image
          animation="fadeInLeft"
          delay={500}
          source={Logo}
          style={style.logo}
          resizeMode="contain"
        />
        <Animatable.Text animation="fadeIn" delay={500} style={style.text}>
          Bem vindo de volta!
        </Animatable.Text>
      </View>

      <Animatable.View animation="fadeInUp" style={style.boxMid}>
        <Text style={style.titleInput}>EMAIL</Text>
        <View style={style.BoxInput}>
          <TextInput
            style={style.input}
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
          />
          <MaterialIcons name="email" size={20} color={themas.colors.gray} />
        </View>

        <Text style={style.titleInput}>SENHA</Text>
        <View style={style.BoxInput}>
          <TextInput
            style={style.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <MaterialIcons
            name="lock"
            size={20}
            color={themas.colors.gray}
          />
        </View>

        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.textButton}>ENTRAR</Text>
        </TouchableOpacity>
      </Animatable.View>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={style.textButtom}>
          Não tem conta ?
          <Text style={{ color: themas.colors.primary }}> Ir para Cadastro</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}