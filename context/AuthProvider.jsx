import { createContext, useContext, useEffect, useState } from "react";
import { logIn } from "../src/hooks/UseLogin";
import { supabase } from "../src/lib/supabase";

//Creamos un contexto
const AuthContext = createContext({});

//Exportamos la autentificacion usando contexto
export const useAuth = () => useContext(AuthContext);

//funcion de inicio de sesion
const login = (email, password) => supabase.auth.signInWithPassword({ email, password });


const AuthProvider = ({ children }) => {
  //Estado para guardar el usuario
  const [user, setUser] = useState(null);
  //Estado para guardar la autentificacion
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    //Observamos los cambios de eventos y actuamos en consecuencia
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
        console.log('SESION PUNTO USER: ',session.user)
      }
      if(event === "SIGNED_OUT"){
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;