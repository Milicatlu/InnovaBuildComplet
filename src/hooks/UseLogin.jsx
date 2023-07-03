import { supabase } from "../lib/supabase";
export const logIn = async (email, password) => {
  try {
    const response = supabase.auth.signInWithPassword({ email, password });
    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
};