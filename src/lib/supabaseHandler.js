import { supabase } from "./supabase";
//Tabla que vamos a usar en supabase, para propositos practicos lo ponemos aca pero deberia ir aparte
const TABLE_USER = "Items";

//No utilizado, para registrar un usuario
export const singUpEmail = async (user) => {
  const response = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });
  if (response.error) {
    console.log(response.error);
  } else {
    console.log(response);
    alert("Check your email for the login link!");
    const responseInsert = await supabase
      .from("users")
      .insert({
        Uuid: responseInsert.data.user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .select();
    console.log(responseInsert);
  }
};
//No utilizado, para iniciar sesion
export const singInEmail = async (user) => {
  const response = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  console.log(response);
};
//Para buscar un usuario
export const fetchUser = async (user) => {
  const fUser = await supabase
    .from(TABLE_USER)
    .select()
    .eq("email", user.email);
  const fUserAux = await supabase
    .from(TABLE_USER)
    .select()
    .eq("password", user.password);
  if (fetchedUser.data[0].Uuid == fetchedUserAux.data[0].Uuid) {
    console.log("Usuario Encontrado");
    console.log(user);
    return true;
  }
  return false;
};

//Para obtener un usuario
export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
//Para conseguir informacion de alguna columna
export const fetchData = async (data) => {
  const response = await supabase.from(TABLE_DATA).select(data);
  return response;
};

//Eliminar usuario
export const deleteUser = async (user) => {
  const response = await supabase
    .from(TABLE_USER)
    .delete()
    .eq("Uuid", user.Uuid);
  return response;
};

//Actualizar usuario con otros parametros
export const updateUserName = async (data) => {
  const response = await supabase
    .from(TABLE_USER)
    .update({ name: data.name })
    .eq("Uuid", data.Uuid);
  return response;
};

//Lo mismo que informacion de usuario
export const getUserData = async (id) => {
  const response = await supabase
    .from(TABLE_USER)
    .select()
    .eq("Uuid", id)
    .single();
  return response;
};
//Obtener nombre de usuario
export const getUserName = async (email) => {
  const response = await supabase.from("users").select().eq("email", email);

  return response;
};

//Resetear la contraseña
export const resetPass = async (navigation,email) =>{
  const response = await supabase.auth.resetPasswordForEmail(email);
  console.log(response)
  if (response.success) {
    navigation.navigate('cambiocontra');
  }

  return response;
}