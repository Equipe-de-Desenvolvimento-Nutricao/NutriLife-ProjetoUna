import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro/cadastro';
import Home from './src/pages/home';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cadastro: undefined;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //<Home/>
      <NavigationContainer>
       <Stack.Navigator initialRouteName="Home">
         <Stack.Screen 
           name="Home" 
           component={Home} 
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
       </Stack.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
  
});
