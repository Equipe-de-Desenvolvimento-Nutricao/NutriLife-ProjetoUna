import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { style } from "./styles";
import { themas } from "../../global/themes";

export default function Diploma() {
  const navigation = useNavigation();
  const [imagemUri, setImagemUri] = useState<string | null>(null);

  const escolherDaGaleria = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissao.granted) {
      Alert.alert("Permissão negada", "Precisamos de acesso à galeria!");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagemUri(resultado.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissao.granted) {
      Alert.alert("Permissão negada", "Precisamos de acesso à câmera!");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagemUri(resultado.assets[0].uri);
    }
  };

  const enviarDiploma = () => {
    if (!imagemUri) {
      Alert.alert("Atenção", "Selecione uma imagem primeiro!");
      return;
    }

    // Aqui você vai implementar o envio pro backend depois
    Alert.alert("Sucesso", "Diploma anexado com sucesso!");
    navigation.goBack();
  };

  return (
    <View style={style.container}>
      <Animatable.View animation="fadeInDown" duration={800} style={style.header}>
        <FontAwesome5 name="graduation-cap" size={40} color="#fff" />
        <Text style={style.headerTitle}>Anexar Diploma</Text>
        <Text style={style.headerSubtitle}>Envie seu diploma para verificação</Text>
      </Animatable.View>

      <View style={style.body}>
        {imagemUri ? (
          <Animatable.View animation="fadeIn" style={style.previewContainer}>
            <Image source={{ uri: imagemUri }} style={style.imagemPreview} />
            <TouchableOpacity 
              style={style.removerButton}
              onPress={() => setImagemUri(null)}
            >
              <Text style={style.removerText}>Remover</Text>
            </TouchableOpacity>
          </Animatable.View>
        ) : (
          <Animatable.View animation="fadeIn" style={style.placeholderContainer}>
            <FontAwesome5 name="file-image" size={60} color="#ccc" />
            <Text style={style.placeholderText}>Nenhuma imagem selecionada</Text>
          </Animatable.View>
        )}

        <View style={style.botoesContainer}>
          <TouchableOpacity style={style.botaoGaleria} onPress={escolherDaGaleria}>
            <FontAwesome5 name="images" size={24} color="#fff" />
            <Text style={style.botaoTexto}>Galeria</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.botaoCamera} onPress={tirarFoto}>
            <FontAwesome5 name="camera" size={24} color="#fff" />
            <Text style={style.botaoTexto}>Câmera</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[style.botaoEnviar, !imagemUri && style.botaoDesabilitado]}
          onPress={enviarDiploma}
          disabled={!imagemUri}
        >
          <Text style={style.botaoEnviarTexto}>ENVIAR DIPLOMA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={style.botaoVoltarTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}