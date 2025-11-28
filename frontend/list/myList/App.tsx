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

export type RootStackParamList = {
  Inicio: undefined;
  Login: undefined;
  Cadastro: undefined;
  Home: undefined; 
  Imc: undefined;                           
  Get: undefined;                           
  ResultadoGet: {                           
    tmb: string;
    manter: string;
    emagrecer: string;
    ganhar: string;
  };
  Diploma: undefined;
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
          name="Diploma" 
          component={Diploma} 
          options={{ headerShown: false }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
  
});
