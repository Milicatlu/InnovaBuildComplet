import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Bienvenido from "./src/components/Bienvenido.jsx";
import BienvenidoEmpezar from "./src/components/BienvenidoEmpezar.jsx";
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import AuthProvider from "./context/AuthProvider.jsx";

 
const Stack = createStackNavigator();


  export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
  
    useEffect(() => {
      loadFonts();
    }, []);  
    const loadFonts = async () => {
      await Font.loadAsync({
        "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
        "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        "Portico-Outline": require("./assets/fonts/Portico-Outline.otf"),
      });
      setFontsLoaded(true);
    };
  
    if (!fontsLoaded) {
      return null;
    }

  return (
    <AuthProvider>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="bienvenido" component={Bienvenido} />
        <Stack.Screen name="bienvenidoempezar" component={BienvenidoEmpezar} />
    </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}




/*import { Main } from "./src/components/Main.jsx";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import Login from "./src/components/Login.jsx";
import Bienvenido from "./src/components/Bienvenido.jsx";
import BienvenidoEmpezar from "./src/components/BienvenidoEmpezar.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import Registro from "./src/components/RegistroAle.jsx";
import OlvideMiContraseña from "./src/components/OlvideMiContraseña.jsx";
import { Terminos } from "./src/components/Terminos.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Camara from "./src/components/Camara.jsx";
const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    loadFonts();
  }, []);
  const loadFonts = async () => {
    await Font.loadAsync({
      "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
      "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
      Portico: require("./assets/fonts/Portico-Outline.otf"),
      "Portico-Outline": require("./assets/fonts/Portico-Outline.otf"),
    });
    setFontsLoaded(true);
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="bienvenido" component={Bienvenido} />
        <Stack.Screen name="bienvenidoempezar" component={BienvenidoEmpezar} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="inicio" component={Main} />
        <Stack.Screen name="regis" component={Registro} />
        <Stack.Screen name="contraseña" component={OlvideMiContraseña} />
        <Stack.Screen name="terminos" component={Terminos} />
        <Stack.Screen name="camara" component={Camara} />

      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
 */