import { supabase } from "../lib/supabase";
import { mysite } from "../Constants/dbConstants";



export const singUpEmail = async (name, email, password) => {
   const response = await supabase.auth.signUp({
      email: email,
      password: password
   });

   console.log(response)
   if (response.error) {
      console.log(response.error);
   } else {

      //const hashName = await generateHash(name)
      //const hashEmail = await generateHash(email)
      //const hashPassword = await generateHash(password)

      const responseInsert = await supabase
         .from("users")
         .insert({
            uuid: response.data.user.id,
            name: name,
            email: email,
            password: password,
            //name: hashName,
            //email: hashEmail,
            //password: hashPassword
         })
         .select();
      console.log(responseInsert);
   }
};

export async function sendPasswordResetRequest(email) {
   try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: mysite,
      });
      if (error) throw error;
      console.log('Password reset email sent');
   } catch (error) {
      console.error('Error sending password reset email:', error);
   }
}