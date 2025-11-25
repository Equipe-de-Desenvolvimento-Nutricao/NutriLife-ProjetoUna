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
  
  if (!login || !senha) {
    Alert.alert('Erro', 'Preencha todos os campos!');
    return;
  }

  try {
    const response = await fetch("http://192.168.15.3:8080/nutricionistas/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: login,
        senha: senha,
      }),
    });

    console.log("📊 Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ Erro do servidor:", errorText);
      Alert.alert("Erro", errorText || "Usuário ou senha incorretos.");
      return;
    }

    const data = await response.text(); // Backend retorna texto, não JSON
    console.log("✅ Resposta:", data);

    Alert.alert("Sucesso", "Login realizado!");
    navigation.navigate("Home");

  } catch (error) {
    console.log("❌ Erro na requisição:", error);
    Alert.alert("Erro", "Falha ao conectar ao servidor.");
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