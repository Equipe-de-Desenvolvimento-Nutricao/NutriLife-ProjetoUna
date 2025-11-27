import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import Inicio from '../pages/inicio';
import BottomRoutes from './bottom.routes';
import Home from '../pages/inicio';
import Get from '../pages/get';
import ResultadoGet from '../pages/resultadoGet';

export type RootStackParamList = {
  Inicio: undefined;
  Login: undefined;
  Cadastro: undefined;
  BottomRoutes: undefined;
  Get: undefined;
  Home: undefined;
  Imc: undefined;
  ResultadoGet: {
    tmb: string;
    manter: string;
    emagrecer: string;
    ganhar: string;
  };
  
};

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
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
           name="BottomRoutes" 
           component={BottomRoutes} 
           options={{ headerShown: false }}
         />
         <Stack.Screen 
         name="Get" 
         component={Get} />
          <Stack.Screen 
          name="ResultadoGet" 
          component={ResultadoGet} 
          options={{ headerShown: false }}
          />

       </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  
  
});
