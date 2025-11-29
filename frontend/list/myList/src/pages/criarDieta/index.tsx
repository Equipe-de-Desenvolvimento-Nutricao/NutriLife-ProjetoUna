import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { style } from "./styles";
import { themas } from "../../global/themes";
import { api } from "../../services/api";

type CriarDietaRouteProp = RouteProp<RootStackParamList, "CriarDieta">;

interface Alimento {
  nome: string;
  quantidade: string;
}

interface Refeicao {
  nome: string;
  horario: string;
  ordem: number;
  alimentos: Alimento[];
  expandido: boolean;
}

export default function CriarDieta() {
  const route = useRoute<CriarDietaRouteProp>();
  const navigation = useNavigation();
  const { paciente } = route.params;

  const [titulo, setTitulo] = useState(`Dieta - ${paciente.nome}`);
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const [loading, setLoading] = useState(false);

  const adicionarRefeicao = () => {
    const novaRefeicao: Refeicao = {
      nome: "",
      horario: "",
      ordem: refeicoes.length + 1,
      alimentos: [],
      expandido: true,
    };
    setRefeicoes([...refeicoes, novaRefeicao]);
  };

  const removerRefeicao = (index: number) => {
    const novasRefeicoes = refeicoes.filter((_, i) => i !== index);
    setRefeicoes(novasRefeicoes);
  };

  const atualizarRefeicao = (index: number, campo: string, valor: string) => {
    const novasRefeicoes = [...refeicoes];
    novasRefeicoes[index] = { ...novasRefeicoes[index], [campo]: valor };
    setRefeicoes(novasRefeicoes);
  };

  const toggleRefeicao = (index: number) => {
    const novasRefeicoes = [...refeicoes];
    novasRefeicoes[index].expandido = !novasRefeicoes[index].expandido;
    setRefeicoes(novasRefeicoes);
  };

  const adicionarAlimento = (refeicaoIndex: number) => {
    const novasRefeicoes = [...refeicoes];
    novasRefeicoes[refeicaoIndex].alimentos.push({ nome: "", quantidade: "" });
    setRefeicoes(novasRefeicoes);
  };

  const removerAlimento = (refeicaoIndex: number, alimentoIndex: number) => {
    const novasRefeicoes = [...refeicoes];
    novasRefeicoes[refeicaoIndex].alimentos = novasRefeicoes[refeicaoIndex].alimentos.filter(
      (_, i) => i !== alimentoIndex
    );
    setRefeicoes(novasRefeicoes);
  };

  const atualizarAlimento = (
    refeicaoIndex: number,
    alimentoIndex: number,
    campo: string,
    valor: string
  ) => {
    const novasRefeicoes = [...refeicoes];
    novasRefeicoes[refeicaoIndex].alimentos[alimentoIndex] = {
      ...novasRefeicoes[refeicaoIndex].alimentos[alimentoIndex],
      [campo]: valor,
    };
    setRefeicoes(novasRefeicoes);
  };

  const salvarDieta = async () => {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Digite um título para a dieta!");
      return;
    }

    if (refeicoes.length === 0) {
      Alert.alert("Atenção", "Adicione pelo menos uma refeição!");
      return;
    }

    // Validar refeições
    for (let i = 0; i < refeicoes.length; i++) {
      const refeicao = refeicoes[i];
      
      if (!refeicao.nome.trim()) {
        Alert.alert("Atenção", `Digite o nome da refeição ${i + 1}!`);
        return;
      }

      if (!refeicao.horario.trim()) {
        Alert.alert("Atenção", `Digite o horário da refeição "${refeicao.nome}"!`);
        return;
      }

      if (refeicao.alimentos.length === 0) {
        Alert.alert("Atenção", `Adicione pelo menos um alimento em "${refeicao.nome}"!`);
        return;
      }

      for (let j = 0; j < refeicao.alimentos.length; j++) {
        const alimento = refeicao.alimentos[j];
        
        if (!alimento.nome.trim() || !alimento.quantidade.trim()) {
          Alert.alert("Atenção", `Preencha todos os dados dos alimentos em "${refeicao.nome}"!`);
          return;
        }
      }
    }

    setLoading(true);

    try {
      const dietaData = {
        pacienteId: paciente.id,
        nutricionistaId: 1, // Por enquanto fixo
        titulo: titulo,
        refeicoes: refeicoes.map(({ expandido, ...rest }) => rest), // Remove o campo 'expandido'
      };

      await api.post("/dietas/cadastrar", dietaData);

      Alert.alert("Sucesso", "Dieta criada com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Home") }
      ]);
      
    } catch (error) {
      console.error("Erro ao salvar dieta:", error);
      Alert.alert("Erro", "Não foi possível salvar a dieta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Animatable.View animation="fadeInDown" duration={800} style={style.header}>
        <TouchableOpacity style={style.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <FontAwesome5 name="clipboard-list" size={35} color="#fff" />
        <Text style={style.headerTitle}>Criar Dieta</Text>
      </Animatable.View>

      <ScrollView style={style.body} showsVerticalScrollIndicator={false}>
        {/* Card do Paciente */}
        <Animatable.View animation="fadeIn" delay={200} style={style.pacienteCard}>
          <View style={style.pacienteHeader}>
            <FontAwesome5 name="user" size={24} color={themas.colors.primary} />
            <Text style={style.pacienteNome}>{paciente.nome}</Text>
          </View>
          
          <View style={style.pacienteInfo}>
            <Text style={style.pacienteDetalhe}>
              📊 {paciente.idade} anos • {paciente.sexo === "masculino" ? "♂" : "♀"}
            </Text>
            <Text style={style.pacienteDetalhe}>
              ⚖️ {paciente.peso}kg • 📏 {paciente.altura}cm
            </Text>
            <Text style={style.pacienteDetalhe}>
              🔥 GET: {paciente.getManter} kcal/dia
            </Text>
          </View>
        </Animatable.View>

        {/* Título da Dieta */}
        <Animatable.View animation="fadeInUp" delay={400}>
          <Text style={style.label}>Título da Dieta</Text>
          <TextInput
            style={style.inputTitulo}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Dieta de Hipertrofia"
            placeholderTextColor="#999"
          />
        </Animatable.View>

        {/* Lista de Refeições */}
        <Text style={style.sectionTitle}>Refeições</Text>

        {refeicoes.map((refeicao, refeicaoIndex) => (
          <Animatable.View
            key={refeicaoIndex}
            animation="fadeInUp"
            delay={500 + refeicaoIndex * 100}
            style={style.refeicaoCard}
          >
            <TouchableOpacity
              style={style.refeicaoHeader}
              onPress={() => toggleRefeicao(refeicaoIndex)}
              activeOpacity={0.8}
            >
              <View style={style.refeicaoHeaderLeft}>
                <FontAwesome5
                  name={refeicao.expandido ? "chevron-down" : "chevron-right"}
                  size={16}
                  color={themas.colors.primary}
                />
                <Text style={style.refeicaoNome}>
                  {refeicao.nome || `Refeição ${refeicaoIndex + 1}`}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removerRefeicao(refeicaoIndex)}>
                <FontAwesome5 name="trash" size={16} color="#e74c3c" />
              </TouchableOpacity>
            </TouchableOpacity>

            {refeicao.expandido && (
              <View style={style.refeicaoBody}>
                <Text style={style.labelSmall}>Nome da Refeição</Text>
                <TextInput
                  style={style.input}
                  value={refeicao.nome}
                  onChangeText={(text) => atualizarRefeicao(refeicaoIndex, "nome", text)}
                  placeholder="Ex: Café da Manhã"
                  placeholderTextColor="#999"
                />

                <Text style={style.labelSmall}>Horário</Text>
                <TextInput
                  style={style.input}
                  value={refeicao.horario}
                  onChangeText={(text) => atualizarRefeicao(refeicaoIndex, "horario", text)}
                  placeholder="Ex: 08:00"
                  placeholderTextColor="#999"
                />

                <Text style={style.labelSmall}>Alimentos</Text>

                {refeicao.alimentos.map((alimento, alimentoIndex) => (
                  <View key={alimentoIndex} style={style.alimentoRow}>
                    <TextInput
                      style={[style.input, { flex: 2, marginRight: 8 }]}
                      value={alimento.nome}
                      onChangeText={(text) =>
                        atualizarAlimento(refeicaoIndex, alimentoIndex, "nome", text)
                      }
                      placeholder="Nome do alimento"
                      placeholderTextColor="#999"
                    />
                    <TextInput
                      style={[style.input, { flex: 1, marginRight: 8 }]}
                      value={alimento.quantidade}
                      onChangeText={(text) =>
                        atualizarAlimento(refeicaoIndex, alimentoIndex, "quantidade", text)
                      }
                      placeholder="Qtd"
                      placeholderTextColor="#999"
                    />
                    <TouchableOpacity
                      onPress={() => removerAlimento(refeicaoIndex, alimentoIndex)}
                    >
                      <FontAwesome5 name="times-circle" size={24} color="#e74c3c" />
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity
                  style={style.buttonAddAlimento}
                  onPress={() => adicionarAlimento(refeicaoIndex)}
                >
                  <FontAwesome5 name="plus" size={14} color={themas.colors.primary} />
                  <Text style={style.buttonAddAlimentoText}>Adicionar Alimento</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animatable.View>
        ))}

        <TouchableOpacity style={style.buttonAddRefeicao} onPress={adicionarRefeicao}>
          <FontAwesome5 name="plus-circle" size={20} color="#fff" />
          <Text style={style.buttonAddRefeicaoText}>Adicionar Refeição</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.buttonSalvar, loading && style.buttonDisabled]}
          onPress={salvarDieta}
          disabled={loading}
        >
          <Text style={style.buttonSalvarText}>
            {loading ? "SALVANDO..." : "SALVAR DIETA"}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}