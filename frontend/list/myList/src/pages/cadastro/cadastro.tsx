import React, { useState } from "react";
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { api } from "../../services/api";

type CadastroScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Cadastro"
>;

export default function Cadastro() {
  const navigation = useNavigation<CadastroScreenProp>();

  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erroUsuario, setErroUsuario] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const usuarioRegex = /^[a-zA-Z0-9._]{3,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validarCampos = () => {
    let valido = true;

    if (!usuarioRegex.test(usuario)) {
      setErroUsuario(
        "Usuário deve ter entre 3 e 15 caracteres e conter apenas letras, números, ponto ou underline."
      );
      valido = false;
    } else {
      setErroUsuario("");
    }

    if (!emailRegex.test(email)) {
      setErroEmail("Digite um e-mail válido.");
      valido = false;
    } else {
      setErroEmail("");
    }

    if (!senhaRegex.test(senha)) {
      setErroSenha(
        "A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra e um número."
      );
      valido = false;
    } else {
      setErroSenha("");
    }

    return valido;
  };

  const handleCadastro = async () => {
    console.log("🔵 Botão clicado!");
    console.log("Dados:", { usuario, email, senha });
    
    if (!usuario || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    console.log("✅ Passou na validação de campos vazios");

    if (!validarCampos()) {
      console.log("❌ Validação falhou");
      return;
    }
    
    console.log("✅ Passou na validação de regex");
    console.log("🚀 Enviando para o servidor...");
    
    try {
      const response = await api.post("/nutricionistas/cadastrar", {
        nome: usuario,
        email: email,
        senha: senha,
      });

      console.log("✅ Resposta do servidor:", response.data);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.navigate("Login");

    } catch (error: any) {
  console.log("❌ Erro na requisição:", error);
  console.log("📋 Detalhes do erro:", error.response?.data);
  console.log("🔢 Status:", error.response?.status);
  console.log("🌐 URL chamada:", error.config?.url);
  Alert.alert("Erro", "Falha ao cadastrar no servidor.");
  console.error(error);
}
  };
  

  /*const handleCadastro = async () => {
    if (!usuario || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (!validarCampos()) return;
    try {
  const response = await api.post("/nutricionistas/cadastrar", {
    nome: usuario,
    email: email,
    senha: senha,
  });

  Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
  navigation.navigate("Login");

} catch (error) {
  Alert.alert("Erro", "Falha ao cadastrar no servidor.");
  console.error(error);
}
    
  };
  */

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
        <Text style={style.text}>Faça seu cadastro!</Text>
      </View>

      <View style={style.boxMid}>
        {/* Campo usuário */}
        <Text style={style.titleInput}>NOME DE USUÁRIO</Text>
        <View style={style.BoxInput}>
          <TextInput
            style={style.input}
            value={usuario}
            onChangeText={(text) => {
              setUsuario(text);
              if (erroUsuario) validarCampos();
            }}
            placeholder="Digite seu nome de usuário"
          />
          <MaterialIcons
            name="person"
            size={20}
            color={themas.colors.gray}
          />
        </View>
        {erroUsuario ? (
          <Text style={{ color: "red", fontSize: 12 }}>{erroUsuario}</Text>
        ) : null}

        {/* Campo e-mail */}
        <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>
        <View style={style.BoxInput}>
          <TextInput
            style={style.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (erroEmail) validarCampos();
            }}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <MaterialIcons
            name="email"
            size={20}
            color={themas.colors.gray}
          />
        </View>
        {erroEmail ? (
          <Text style={{ color: "red", fontSize: 12 }}>{erroEmail}</Text>
        ) : null}

        {/* Campo senha */}
        <Text style={style.titleInput}>SENHA</Text>
        <View style={style.BoxInput}>
          <TextInput
            style={style.input}
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              if (erroSenha) validarCampos();
            }}
            placeholder="Digite sua senha"
            secureTextEntry
          />
          <MaterialIcons
            name="lock"
            size={20}
            color={themas.colors.gray}
          />
        </View>
        {erroSenha ? (
          <Text style={{ color: "red", fontSize: 12 }}>{erroSenha}</Text>
        ) : null}
      </View>

      <View style={style.boxBotton}>
        <TouchableOpacity
          style={[
            style.button,
            (!usuario || !email || !senha) && { opacity: 0.6 },
          ]}
          onPress={handleCadastro}
          disabled={!usuario || !email || !senha}
        >
          <Text style={style.textButton}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
