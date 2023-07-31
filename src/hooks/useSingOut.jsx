import { supabase } from "../lib/supabase";

//Sirve para cerrar sesion
export const singOut = async () => {
   try {
      const response = await supabase.auth.signOut();
      console.log(response)
   } catch (error) {
      console.log("Error ", error);
   }
};