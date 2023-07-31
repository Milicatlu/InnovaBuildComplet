import { updateUserConstant, updatedPhone } from "../Constants/userConstants"
import { supabase } from "../lib/supabase"

//Sirve para actualizar el usuario
export const updateUser = async (email, name, phone, uuid) => {
   await supabase.from('users').update({ name: name, email: email, phone: phone }).eq('uuid', uuid)
   updateUserConstant(name, email)
   updatedPhone(phone)
}