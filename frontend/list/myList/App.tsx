import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro/cadastro';
import Inicio from './src/pages/inicio';
import Home from './src/pages/home';
import Imc from './src/pages/imc';
import Get from './src/pages/get';
import ResultadoGet from './src/pages/resultadoGet';
import Diploma from './src/pages/diploma';
import SalvarPaciente from './src/pages/salvarPaciente';
import MeusPacientes from './src/pages/meusPacientes';
import SelecionarPaciente from './src/pages/selecionarPaciente';
import CriarDieta from './src/pages/criarDieta';

export type RootStackParamList = {
  Inicio: undefined;
  Login: undefined;
  Cadastro: undefined;
  Home: undefined; 
  Imc: undefined;                           
  Get: undefined;                           
  ResultadoGet: { 
    sexo: string;             
    peso: string;             
    altura: string;           
    idade: string;            
    atividade: string;        
    tmb: string;
    manter: string;
    emagrecer: string;
    ganhar: string;
  };
  SalvarPaciente: {           
    sexo: string;
    peso: string;
    altura: string;
    idade: string;
    atividade: string;
    tmb: string;
    manter: string;
    emagrecer: string;
    ganhar: string;
  };
  Diploma: undefined;
  MeusPacientes: undefined;
  SelecionarPaciente: undefined;
  CriarDieta: {
  paciente: {
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
  };
};
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ title: 'Cadastro' }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Imc" 
          component={Imc} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Get" 
          component={Get} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ResultadoGet" 
          component={ResultadoGet} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SalvarPaciente" 
          component={SalvarPaciente} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Diploma" 
          component={Diploma} 
          options={{ headerShown: false }}
        />
          <Stack.Screen 
          name="MeusPacientes" 
          component={MeusPacientes} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SelecionarPaciente" 
          component={SelecionarPaciente} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="CriarDieta" 
        component={CriarDieta} 
        options={{ headerShown: false }}
        />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});