import { supabase } from "../lib/supabase";

export const singOut = async () => {
   try {
      const response = await supabase.auth.signOut();
   } catch (error) {
      console.log("Error ", error);
   }
};