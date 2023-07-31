//Handler para utilizar los datos del usuario
export const userConstant = {
  name: null,
  email: null,
  uuid: null,
};

//Actualizar las constantes de usuarios 
export const updateUserConstant = (name, email) => {
  userConstant.name = name;
  userConstant.email = email;
};

//El telefono del usuario, separado al ser opcional
export const phone = "";

//Para actualizar el telefono
export const updatedPhone = (newPhone) => {
  phone = newPhone;
};
