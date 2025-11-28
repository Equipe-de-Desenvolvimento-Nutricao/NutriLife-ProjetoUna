import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { style } from "./styles";
import { themas } from "../../global/themes";
import { api } from "../../services/api";

type SalvarPacienteRouteProp = RouteProp<RootStackParamList, "SalvarPaciente">;
type SalvarPacienteNavigationProp = NativeStackNavigationProp<RootStackParamList, "SalvarPaciente">;

export default function SalvarPaciente() {
  const route = useRoute<SalvarPacienteRouteProp>();
  const navigation = useNavigation<SalvarPacienteNavigationProp>();
  
  const { sexo, peso, altura, idade, atividade, tmb, manter, emagrecer, ganhar } = route.params;

  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  const salvarPaciente = async () => {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Digite o nome do paciente!");
      return;
    }

    setLoading(true);

    try {
      await api.post("/pacientes/cadastrar", {
        nutricionistaId: 1,
        nome: nome,
        idade: parseInt(idade),
        sexo: sexo,
        altura: parseFloat(altura),
        peso: parseFloat(peso),
        nivelAtividade: atividade,
        tmb: parseInt(tmb),
        getManter: parseInt(manter),
        getEmagrecer: parseInt(emagrecer),
        getGanhar: parseInt(ganhar),
      });

      Alert.alert("Sucesso", "Paciente e resultados salvos com sucesso!");
      navigation.navigate("Home");
      
    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar o paciente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={style.container}>
      <Animatable.View animation="fadeInDown" duration={800} style={style.header}>
        <FontAwesome5 name="user-plus" size={40} color="#fff" />
        <Text style={style.headerTitle}>Salvar Paciente</Text>
      </Animatable.View>

      <View style={style.body}>
        <Animatable.View animation="fadeIn" delay={200} style={style.card}>
          <Text style={style.cardTitle}>Resultados do GET</Text>
          
          <View style={style.resultRow}>
            <Text style={style.resultLabel}>TMB:</Text>
            <Text style={style.resultValue}>{tmb} kcal</Text>
          </View>

          <View style={style.resultRow}>
            <Text style={style.resultLabel}>Manter peso:</Text>
            <Text style={style.resultValue}>{manter} kcal</Text>
          </View>

          <View style={style.resultRow}>
            <Text style={style.resultLabel}>Emagrecer:</Text>
            <Text style={style.resultValue}>{emagrecer} kcal</Text>
          </View>

          <View style={style.resultRow}>
            <Text style={style.resultLabel}>Ganhar peso:</Text>
            <Text style={style.resultValue}>{ganhar} kcal</Text>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400}>
          <Text style={style.label}>Nome do Paciente</Text>
          <View style={style.inputRow}>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Digite o nome completo"
              placeholderTextColor="#9e9e9e"
              style={style.input}
            />
            <FontAwesome5 name="user" size={18} style={style.icon} />
          </View>

          <View style={style.infoContainer}>
            <Text style={style.infoText}>📊 Idade: {idade} anos</Text>
            <Text style={style.infoText}>⚧ Sexo: {sexo === "masculino" ? "Masculino" : "Feminino"}</Text>
            <Text style={style.infoText}>📏 Altura: {altura} cm</Text>
            <Text style={style.infoText}>⚖️ Peso: {peso} kg</Text>
            <Text style={style.infoText}>🏃 Atividade: {atividade}</Text>
          </View>

          <TouchableOpacity
            style={[style.buttonPrimary, loading && style.buttonDisabled]}
            onPress={salvarPaciente}
            disabled={loading}
          >
            <Text style={style.buttonPrimaryText}>
              {loading ? "SALVANDO..." : "SALVAR PACIENTE"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.buttonSecondary} onPress={() => navigation.goBack()}>
            <Text style={style.buttonSecondaryText}>CANCELAR</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}