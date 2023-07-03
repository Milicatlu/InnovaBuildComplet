export const userConstant = {
  name: null,
  email: null,
  uuid: null,
};

export const updateUserConstant = (name, email) => {
  userConstant.name = name;
  userConstant.email = email;
};

export const phone = "";

export const updatedPhone = (newPhone) => {
  phone = newPhone;
};
