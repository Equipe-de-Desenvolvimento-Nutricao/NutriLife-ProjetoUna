import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { style } from "./styles";
import { themas } from "../../global/themes";
import { api } from "../../services/api";

interface Paciente {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  altura: number;
  peso: number;
  nivelAtividade: string;
  tmb: number;
  getManter: number;
  getEmagrecer: number;
  getGanhar: number;
}

type SelecionarPacienteNavigationProp = NativeStackNavigationProp<RootStackParamList, "SelecionarPaciente">;

export default function SelecionarPaciente() {
  const navigation = useNavigation<SelecionarPacienteNavigationProp>();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {
    try {
      const response = await api.get("/pacientes/nutricionista/1");
      setPacientes(response.data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
      Alert.alert("Erro", "Não foi possível carregar os pacientes.");
    } finally {
      setLoading(false);
    }
  };

  const selecionarPaciente = (paciente: Paciente) => {
  navigation.navigate("CriarDieta", { paciente });
};

  const renderPaciente = ({ item }: { item: Paciente }) => (
    <Animatable.View animation="fadeInUp" duration={600}>
      <TouchableOpacity
        style={style.card}
        onPress={() => selecionarPaciente(item)}
        activeOpacity={0.8}
      >
        <View style={style.avatarContainer}>
          <FontAwesome5 
            name="user" 
            size={30} 
            color={themas.colors.primary} 
          />
        </View>

        <View style={style.infoContainer}>
          <Text style={style.nome}>{item.nome}</Text>
          <Text style={style.detalhes}>
            {item.idade} anos • {item.sexo === "masculino" ? "♂" : "♀"}
          </Text>
          <Text style={style.detalhes}>
            {item.peso}kg • {item.altura}cm
          </Text>
        </View>

        <View style={style.getInfo}>
          <Text style={style.getLabel}>GET</Text>
          <Text style={style.getValor}>{item.getManter} kcal</Text>
        </View>

        <FontAwesome5 
          name="chevron-right" 
          size={20} 
          color={themas.colors.primary} 
        />
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={style.container}>
      <Animatable.View animation="fadeInDown" duration={800} style={style.header}>
        <TouchableOpacity 
          style={style.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <FontAwesome5 name="clipboard-list" size={40} color="#fff" />
        <Text style={style.headerTitle}>Criar Dieta</Text>
        <Text style={style.headerSubtitle}>Selecione o paciente</Text>
      </Animatable.View>

      {loading ? (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color={themas.colors.primary} />
          <Text style={style.loadingText}>Carregando pacientes...</Text>
        </View>
      ) : pacientes.length === 0 ? (
        <View style={style.emptyContainer}>
          <FontAwesome5 name="user-plus" size={60} color="#ccc" />
          <Text style={style.emptyText}>Nenhum paciente cadastrado</Text>
          <Text style={style.emptySubtext}>
            Cadastre pacientes primeiro para criar dietas!
          </Text>
          <TouchableOpacity 
            style={style.buttonCadastrar}
            onPress={() => navigation.navigate("Get")}
          >
            <Text style={style.buttonCadastrarText}>CADASTRAR PACIENTE</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={pacientes}
          renderItem={renderPaciente}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={style.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}