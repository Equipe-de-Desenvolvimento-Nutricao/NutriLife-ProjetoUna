import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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

export default function MeusPacientes() {
  const navigation = useNavigation();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {
    try {
      // Por enquanto usando nutricionistaId fixo como 1
      // Depois você pega do contexto/login
      const response = await api.get("/pacientes/nutricionista/1");
      setPacientes(response.data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
      Alert.alert("Erro", "Não foi possível carregar os pacientes.");
    } finally {
      setLoading(false);
    }
  };

  const renderPaciente = ({ item }: { item: Paciente }) => (
    <Animatable.View animation="fadeInUp" duration={600} style={style.card}>
      <View style={style.cardHeader}>
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
            {item.idade} anos • {item.sexo === "masculino" ? "♂" : "♀"} • {item.peso}kg • {item.altura}cm
          </Text>
        </View>
      </View>

      <View style={style.divider} />

      <View style={style.getContainer}>
        <Text style={style.getTitle}>Gasto Energético Total (GET)</Text>
        
        <View style={style.getRow}>
          <View style={style.getItem}>
            <FontAwesome5 name="fire" size={16} color={themas.colors.primary} />
            <Text style={style.getLabel}>TMB</Text>
            <Text style={style.getValue}>{item.tmb} kcal</Text>
          </View>

          <View style={style.getItem}>
            <FontAwesome5 name="balance-scale" size={16} color={themas.colors.primary} />
            <Text style={style.getLabel}>Manter</Text>
            <Text style={style.getValue}>{item.getManter} kcal</Text>
          </View>

          <View style={style.getItem}>
            <FontAwesome5 name="arrow-down" size={16} color="#e74c3c" />
            <Text style={style.getLabel}>Emagrecer</Text>
            <Text style={style.getValue}>{item.getEmagrecer} kcal</Text>
          </View>

          <View style={style.getItem}>
            <FontAwesome5 name="arrow-up" size={16} color="#3498db" />
            <Text style={style.getLabel}>Ganhar</Text>
            <Text style={style.getValue}>{item.getGanhar} kcal</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={style.detailsButton}
        onPress={() => Alert.alert("Em breve", "Funcionalidade de detalhes em desenvolvimento")}
      >
        <Text style={style.detailsButtonText}>VER DETALHES</Text>
        <FontAwesome5 name="chevron-right" size={14} color={themas.colors.primary} />
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
        <FontAwesome5 name="users" size={40} color="#fff" />
        <Text style={style.headerTitle}>Meus Pacientes</Text>
        <Text style={style.headerSubtitle}>
          {pacientes.length} {pacientes.length === 1 ? "paciente cadastrado" : "pacientes cadastrados"}
        </Text>
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
            Cadastre um paciente calculando o GET e salvando os dados!
          </Text>
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