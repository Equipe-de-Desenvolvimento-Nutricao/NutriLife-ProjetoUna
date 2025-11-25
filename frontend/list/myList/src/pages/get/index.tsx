import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "../../../node_modules/expo/node_modules/@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../routes/index.routes";
import { style } from "./styles";
import { themas } from "../../global/themes";

type GetScreenProp = NativeStackNavigationProp<RootStackParamList, "Get">;

type NivelAtividade =
  | "sedentario"
  | "ligeira"
  | "moderada"
  | "intensa"
  | "muito_intensa"
  | "";

export default function Get() {
  const navigation = useNavigation<GetScreenProp>();

  const [sexo, setSexo] = useState<"masculino" | "feminino" | null>(null);
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [atividade, setAtividade] = useState<NivelAtividade>("");

  const calcularGET = () => {
    if (!sexo || !peso || !altura || !idade || !atividade) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const p = Number(peso.replace(",", "."));
    const a = Number(altura.replace(",", "."));
    const i = Number(idade);

    if (isNaN(p) || isNaN(a) || isNaN(i) || p <= 0 || a <= 0 || i <= 0) {
      Alert.alert("Atenção", "Informe valores numéricos válidos!");
      return;
    }

    let tmb = 0;
    if (sexo === "masculino") {
      tmb = 10 * p + 6.25 * a - 5 * i + 5;
    } else {
      tmb = 10 * p + 6.25 * a - 5 * i - 161;
    }

    const fatores: Record<Exclude<NivelAtividade, "">, number> = {
      sedentario: 1.2,
      ligeira: 1.375,
      moderada: 1.55,
      intensa: 1.725,
      muito_intensa: 1.9,
    };

    const fator = fatores[atividade as Exclude<NivelAtividade, "">];
    const get = tmb * fator;

    const manter = get;
    const emagrecer = get - 400;
    const ganhar = get + 400;

    navigation.navigate("ResultadoGet", {
      tmb: Math.round(tmb).toString(),
      manter: Math.round(manter).toString(),
      emagrecer: Math.round(emagrecer).toString(),
      ganhar: Math.round(ganhar).toString(),
    });
  };

  return (
    <View style={style.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themas.colors.primary}
        translucent={false}
      />
        <Animatable.View
          animation="fadeInDown"
          duration={600}
          style={style.headerArea}
        >
          <Text style={style.headerTitle}>GET</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={600} style={style.body}>
          <Text style={style.label}>Sexo</Text>
          <View style={style.radioArea}>
            <TouchableOpacity
              style={style.radioOption}
              onPress={() => setSexo("masculino")}
              activeOpacity={0.8}
            >
              <View
                style={[
                  style.radioCircle,
                  sexo === "masculino" && style.radioSelected,
                ]}
              />
              <Text style={style.radioText}>Masculino</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={style.radioOption}
              onPress={() => setSexo("feminino")}
              activeOpacity={0.8}
            >
              <View
                style={[
                  style.radioCircle,
                  sexo === "feminino" && style.radioSelected,
                ]}
              />
              <Text style={style.radioText}>Feminino</Text>
            </TouchableOpacity>
          </View>

          <Text style={style.label}>PESO (kg)</Text>
          <View style={style.inputRow}>
            <TextInput
              style={style.input}
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
              placeholder="Ex: 72"
              placeholderTextColor="#9e9e9e"
            />
            <FontAwesome5 name="weight-hanging" size={18} style={style.icon} />
          </View>

          <Text style={style.label}>ALTURA (cm)</Text>
          <View style={style.inputRow}>
            <TextInput
              style={style.input}
              keyboardType="numeric"
              value={altura}
              onChangeText={setAltura}
              placeholder="Ex: 175"
              placeholderTextColor="#9e9e9e"
            />
            <FontAwesome5 name="ruler-vertical" size={18} style={style.icon} />
          </View>

          <Text style={style.label}>IDADE</Text>
          <View style={style.inputRow}>
            <TextInput
              style={style.input}
              keyboardType="numeric"
              value={idade}
              onChangeText={setIdade}
              placeholder="Ex: 30"
              placeholderTextColor="#9e9e9e"
            />
            <FontAwesome5 name="user" size={18} style={style.icon} />
          </View>

          <Text style={style.label}>Nível de atividade</Text>
          <View style={style.pickerBox}>
            <Picker
              selectedValue={atividade}
              onValueChange={(itemValue) => setAtividade(itemValue)}
              style={{ width: "100%" }}
              mode="dropdown"
            >
              <Picker.Item label="Selecione..." value="" />
              <Picker.Item label="Sedentário" value="sedentario" />
              <Picker.Item label="Atividade ligeira" value="ligeira" />
              <Picker.Item label="Atividade moderada" value="moderada" />
              <Picker.Item label="Atividade intensa" value="intensa" />
              <Picker.Item
                label="Atividade muito intensa"
                value="muito_intensa"
              />
            </Picker>
          </View>

          <TouchableOpacity
            style={style.buttonPrimary}
            onPress={calcularGET}
            activeOpacity={0.85}
          >
            <Text style={style.buttonPrimaryText}>CALCULAR</Text>
          </TouchableOpacity>
        </Animatable.View>
    </View>
  );
}