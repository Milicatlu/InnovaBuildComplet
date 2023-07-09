import { StatusBar } from "expo-status-bar";
import { useAuth } from "./context/AuthProvider";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Bienvenido from "./src/components/Bienvenido.jsx";
import BienvenidoEmpezar from "./src/components/BienvenidoEmpezar.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import AuthProvider from "./context/AuthProvider.jsx";
import Registro from "./src/components/RegistroAle.jsx";
import Login from "./src/components/Login.jsx";
import OlvideMiContraseña from "./src/components/OlvideMiContraseña.jsx";
import { Terminos } from "./src/components/Terminos.jsx";
import { Main } from "./src/components/Main.jsx";
import { CambioDeContraseña } from "./src/components/CambioDeContraseña.jsx";
import { supabase } from "./src/lib/supabase.ts";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [session, setSession] = useState(null);
  
  const getSession = async () => {
    const response = await supabase.auth.getSession();
    setSession(response.data.session);
  };


  useEffect(() => {
    getSession();
    loadFonts();
  }, []);
  const loadFonts = async () => {
    await Font.loadAsync({
      "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
      "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
      "Portico-Outline": require("./assets/fonts/Portico-Outline.otf")
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session != null
            ? <Stack.Screen name="inicio" component={Main} />
            : <Stack.Screen name="bienvenido" component={Bienvenido} />}
          <Stack.Screen name="inicio2" component={Main} />  
          <Stack.Screen name="bienvenidoempezar" component={BienvenidoEmpezar}/>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="regis" component={Registro} />
          <Stack.Screen name="contraseña" component={OlvideMiContraseña} />
          <Stack.Screen name="cambiocontra" component={CambioDeContraseña} />
          <Stack.Screen name="terminos" component={Terminos} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
