import { supabase } from "./supabase";

const TABLE_USER = "Items";

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

export const singInEmail = async (user) => {
  const response = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  console.log(response);
};

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

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  return user;
};

export const fetchData = async (data) => {
  const response = await supabase.from(TABLE_DATA).select(data);
  return response;
};

export const deleteUser = async (user) => {
  const response = await supabase
    .from(TABLE_USER)
    .delete()
    .eq("Uuid", user.Uuid);
  return response;
};

export const updateUserName = async (data) => {
  const response = await supabase
    .from(TABLE_USER)
    .update({ name: data.name })
    .eq("Uuid", data.Uuid);
  return response;
};

export const getUserData = async (id) => {
  const response = await supabase
    .from(TABLE_USER)
    .select()
    .eq("Uuid", id)
    .single();
  return response;
};

export const getUserName = async (email) => {
  const response = await supabase.from("users").select().eq("email", email);

  return response;
};
