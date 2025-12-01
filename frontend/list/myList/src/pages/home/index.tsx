import React from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { style } from "./styles";
import { themas } from "../../global/themes";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View style={style.container}>
      {/* Header */}
      <Animatable.View animation="fadeInDown" duration={800} style={style.header}>
        <FontAwesome5 name="heartbeat" size={40} color="#fff" />
        <Text style={style.headerTitle}>NutriLife</Text>
        <Text style={style.headerSubtitle}>Bem-vindo, Nutricionista!</Text>
      </Animatable.View>

      {/* Body */}
      <ScrollView style={style.body} showsVerticalScrollIndicator={false}>
        <Animatable.Text animation="fadeIn" delay={200} style={style.sectionTitle}>
          Ferramentas Disponíveis
        </Animatable.Text>

        {/* Grid 2x2 - Primeiros 4 cards */}
        <View style={style.gridContainer}>
          {/* Card IMC */}
          <Animatable.View animation="fadeInUp" delay={300} style={style.gridItem}>
            <TouchableOpacity
              style={style.smallCard}
              onPress={() => navigation.navigate("Imc")}
              activeOpacity={0.7}
            >
              <View style={style.cardIcon}>
                <FontAwesome5 name="weight" size={35} color={themas.colors.primary} />
              </View>
              <Text style={style.cardTitle}>IMC</Text>
              <Text style={style.cardDescription}>Calcular IMC</Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Card GET */}
          <Animatable.View animation="fadeInUp" delay={400} style={style.gridItem}>
            <TouchableOpacity
              style={style.smallCard}
              onPress={() => navigation.navigate("Get")}
              activeOpacity={0.7}
            >
              <View style={style.cardIcon}>
                <FontAwesome5 name="fire" size={35} color={themas.colors.primary} />
              </View>
              <Text style={style.cardTitle}>GET</Text>
              <Text style={style.cardDescription}>Gasto Energético</Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Card Diploma */}
          <Animatable.View animation="fadeInUp" delay={500} style={style.gridItem}>
            <TouchableOpacity
              style={style.smallCard}
              onPress={() => navigation.navigate("Diploma")}
              activeOpacity={0.7}
            >
              <View style={style.cardIcon}>
                <FontAwesome5 name="file-upload" size={35} color={themas.colors.primary} />
              </View>
              <Text style={style.cardTitle}>Diploma</Text>
              <Text style={style.cardDescription}>Anexar diploma</Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Card Meus Pacientes */}
          <Animatable.View animation="fadeInUp" delay={600} style={style.gridItem}>
            <TouchableOpacity
              style={style.smallCard}
              onPress={() => navigation.navigate("MeusPacientes")}
              activeOpacity={0.7}
            >
              <View style={style.cardIcon}>
                <FontAwesome5 name="users" size={35} color={themas.colors.primary} />
              </View>
              <Text style={style.cardTitle}>Meus Pacientes</Text>
              <Text style={style.cardDescription}>Visualizar pacientes</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        {/* Card Criar Dieta - GRANDE */}
        <Animatable.View animation="fadeInUp" delay={700}>
          <TouchableOpacity
            style={style.largeCard}
            onPress={() => navigation.navigate("SelecionarPaciente")}
            activeOpacity={0.7}
          >
            <View style={style.largeCardContent}>
              <View style={style.largeCardIcon}>
                <FontAwesome5 name="clipboard-list" size={40} color="#fff" />
              </View>
              <View style={style.largeCardText}>
                <Text style={style.largeCardTitle}>Criar Dieta</Text>
                <Text style={style.largeCardDescription}>
                  Montar plano alimentar personalizado
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animatable.View>

        {/* Logo no final */}
        <Animatable.View animation="fadeIn" delay={900} style={style.logoContainer}>
          <Image
            source={{ uri: "https://i.imgur.com/YourImageId.png" }}
            style={style.logo}
            resizeMode="contain"
          />
        </Animatable.View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}