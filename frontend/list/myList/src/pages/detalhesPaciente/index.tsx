import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { style } from "./styles";
import { themas } from "../../global/themes";
import { api } from "../../services/api";

type DetalhesPacienteRouteProp = RouteProp<RootStackParamList, "DetalhesPaciente">;
type DetalhesPacienteNavigationProp = NativeStackNavigationProp<RootStackParamList, "DetalhesPaciente">;

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

interface Alimento {
  id: number;
  nome: string;
  quantidade: string;
}

interface Refeicao {
  id: number;
  nome: string;
  horario: string;
  ordem: number;
  alimentos: Alimento[];
}

interface Dieta {
  id: number;
  titulo: string;
  dataCriacao: string;
  status: string;
  refeicoes: Refeicao[];
}

export default function DetalhesPaciente() {
  const route = useRoute<DetalhesPacienteRouteProp>();
  const navigation = useNavigation<DetalhesPacienteNavigationProp>();
  const { paciente } = route.params;

  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [loading, setLoading] = useState(true);
  const [dietaExpandida, setDietaExpandida] = useState<number | null>(null);
  const [refeicaoExpandida, setRefeicaoExpandida] = useState<number | null>(null);

  useEffect(() => {
    carregarDietas();
  }, []);

  const carregarDietas = async () => {
    try {
      setLoading(true);
      console.log("🔍 Buscando dietas do paciente:", paciente.id);
      const response = await api.get(`/dietas/paciente/${paciente.id}`);
      console.log("✅ Dietas carregadas:", response.data);
      setDietas(response.data);
    } catch (error) {
      console.error("❌ Erro ao carregar dietas:", error);
      Alert.alert("Erro", "Não foi possível carregar as dietas do paciente");
    } finally {
      setLoading(false);
    }
  };

  const toggleDieta = (dietaId: number) => {
    if (dietaExpandida === dietaId) {
      setDietaExpandida(null);
      setRefeicaoExpandida(null);
    } else {
      setDietaExpandida(dietaId);
      setRefeicaoExpandida(null);
    }
  };

  const toggleRefeicao = (refeicaoId: number) => {
    setRefeicaoExpandida(refeicaoExpandida === refeicaoId ? null : refeicaoId);
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <View style={style.container}>
      <Animatable.View animation="fadeInDown" duration={800} style={style.header}>
        <TouchableOpacity 
          style={style.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <FontAwesome5 name="user" size={40} color="#fff" />
        <Text style={style.headerTitle}>Detalhes do Paciente</Text>
      </Animatable.View>

      <ScrollView style={style.body} showsVerticalScrollIndicator={false}>
        {/* Card de Dados do Paciente */}
        <Animatable.View animation="fadeIn" delay={200} style={style.pacienteCard}>
          <View style={style.pacienteHeader}>
            <View style={style.avatarContainer}>
              <FontAwesome5 name="user" size={40} color={themas.colors.primary} />
            </View>
            <View style={style.infoHeader}>
              <Text style={style.nome}>{paciente.nome}</Text>
              <Text style={style.subtitulo}>
                {paciente.idade} anos • {paciente.sexo === "masculino" ? "Masculino" : "Feminino"}
              </Text>
            </View>
          </View>

          <View style={style.divider} />

          <View style={style.dadosGrid}>
            <View style={style.dadoItem}>
              <FontAwesome5 name="weight" size={20} color={themas.colors.primary} />
              <Text style={style.dadoLabel}>Peso</Text>
              <Text style={style.dadoValor}>{paciente.peso} kg</Text>
            </View>

            <View style={style.dadoItem}>
              <FontAwesome5 name="ruler-vertical" size={20} color={themas.colors.primary} />
              <Text style={style.dadoLabel}>Altura</Text>
              <Text style={style.dadoValor}>{paciente.altura} cm</Text>
            </View>

            <View style={style.dadoItem}>
              <FontAwesome5 name="fire" size={20} color={themas.colors.primary} />
              <Text style={style.dadoLabel}>TMB</Text>
              <Text style={style.dadoValor}>{paciente.tmb} kcal</Text>
            </View>

            <View style={style.dadoItem}>
              <FontAwesome5 name="balance-scale" size={20} color={themas.colors.primary} />
              <Text style={style.dadoLabel}>GET</Text>
              <Text style={style.dadoValor}>{paciente.getManter} kcal</Text>
            </View>
          </View>

          <View style={style.divider} />

          <View style={style.getDetalhes}>
            <Text style={style.getTitle}>Objetivos Energéticos</Text>
            
            <View style={style.getRow}>
              <FontAwesome5 name="balance-scale" size={16} color={themas.colors.primary} />
              <Text style={style.getTexto}>Manter peso: {paciente.getManter} kcal/dia</Text>
            </View>

            <View style={style.getRow}>
              <FontAwesome5 name="arrow-down" size={16} color="#e74c3c" />
              <Text style={style.getTexto}>Emagrecer: {paciente.getEmagrecer} kcal/dia</Text>
            </View>

            <View style={style.getRow}>
              <FontAwesome5 name="arrow-up" size={16} color="#3498db" />
              <Text style={style.getTexto}>Ganhar peso: {paciente.getGanhar} kcal/dia</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Seção de Dietas */}
        <Animatable.View animation="fadeInUp" delay={400}>
          <View style={style.dietasHeader}>
            <Text style={style.dietasTitulo}>Dietas do Paciente</Text>
            <TouchableOpacity
              style={style.buttonNovaDieta}
              onPress={() => navigation.navigate("CriarDieta", { paciente })}
            >
              <FontAwesome5 name="plus" size={14} color="#fff" />
              <Text style={style.buttonNovaDietaText}>Nova Dieta</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={style.loadingContainer}>
              <ActivityIndicator size="large" color={themas.colors.primary} />
              <Text style={style.loadingText}>Carregando dietas...</Text>
            </View>
          ) : dietas.length === 0 ? (
            <View style={style.emptyContainer}>
              <FontAwesome5 name="clipboard-list" size={50} color="#ccc" />
              <Text style={style.emptyText}>Nenhuma dieta cadastrada</Text>
              <Text style={style.emptySubtext}>
                Crie a primeira dieta para este paciente!
              </Text>
            </View>
          ) : (
            <View style={style.dietasList}>
              {dietas.map((dieta, index) => (
                <Animatable.View
                  key={dieta.id}
                  animation="fadeInUp"
                  delay={500 + index * 100}
                  style={style.dietaCard}
                >
                  {/* Header da Dieta - CLICÁVEL */}
                  <TouchableOpacity
                    style={style.dietaHeader}
                    onPress={() => toggleDieta(dieta.id)}
                    activeOpacity={0.7}
                  >
                    <View style={style.dietaIconContainer}>
                      <FontAwesome5 name="utensils" size={20} color={themas.colors.primary} />
                    </View>
                    <View style={style.dietaInfo}>
                      <Text style={style.dietaTitulo}>{dieta.titulo}</Text>
                      <Text style={style.dietaData}>
                        Criada em {formatarData(dieta.dataCriacao)}
                      </Text>
                      <View style={style.statusBadge}>
                        <Text style={style.statusText}>
                          {dieta.status === "ativa" ? "● Ativa" : "○ Inativa"}
                        </Text>
                      </View>
                    </View>
                    <FontAwesome5
                      name={dietaExpandida === dieta.id ? "chevron-up" : "chevron-down"}
                      size={18}
                      color="#666"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>

                  {/* Conteúdo Expandido da Dieta */}
                  {dietaExpandida === dieta.id && (
                    <View style={style.dietaContent}>
                      <Text style={style.refeicoesTitle}>
                        Refeições ({dieta.refeicoes?.length || 0})
                      </Text>

                      {/* Lista de Refeições */}
                      {dieta.refeicoes && dieta.refeicoes.length > 0 ? (
                        dieta.refeicoes.map((refeicao) => (
                          <View key={refeicao.id} style={style.refeicaoCard}>
                            {/* Header da Refeição - CLICÁVEL */}
                            <TouchableOpacity
                              style={style.refeicaoHeader}
                              onPress={() => toggleRefeicao(refeicao.id)}
                              activeOpacity={0.7}
                            >
                              <View style={style.refeicaoHeaderLeft}>
                                <View style={style.refeicaoIcone}>
                                  <FontAwesome5
                                    name="clock"
                                    size={14}
                                    color={themas.colors.primary}
                                  />
                                </View>
                                <View>
                                  <Text style={style.refeicaoNome}>
                                    {refeicao.nome}
                                  </Text>
                                  <Text style={style.refeicaoHorario}>
                                    {refeicao.horario}
                                  </Text>
                                </View>
                              </View>
                              <FontAwesome5
                                name={
                                  refeicaoExpandida === refeicao.id
                                    ? "chevron-up"
                                    : "chevron-down"
                                }
                                size={14}
                                color="#999"
                              />
                            </TouchableOpacity>

                            {/* Alimentos da Refeição */}
                            {refeicaoExpandida === refeicao.id && (
                              <View style={style.alimentosContainer}>
                                <Text style={style.alimentosTitle}>
                                  Alimentos ({refeicao.alimentos?.length || 0})
                                </Text>
                                {refeicao.alimentos && refeicao.alimentos.length > 0 ? (
                                  refeicao.alimentos.map((alimento) => (
                                    <View key={alimento.id} style={style.alimentoItem}>
                                      <View style={style.alimentoHeader}>
                                        <FontAwesome5
                                          name="apple-alt"
                                          size={12}
                                          color={themas.colors.primary}
                                        />
                                        <Text style={style.alimentoNome}>
                                          {alimento.nome}
                                        </Text>
                                      </View>
                                      <Text style={style.alimentoQuantidade}>
                                        {alimento.quantidade}
                                      </Text>
                                    </View>
                                  ))
                                ) : (
                                  <Text style={style.emptySubtext}>
                                    Nenhum alimento cadastrado
                                  </Text>
                                )}
                              </View>
                            )}
                          </View>
                        ))
                      ) : (
                        <Text style={style.emptySubtext}>
                          Nenhuma refeição cadastrada
                        </Text>
                      )}
                    </View>
                  )}
                </Animatable.View>
              ))}
            </View>
          )}
        </Animatable.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}