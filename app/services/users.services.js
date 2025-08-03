import api from "../utils/interceptors";

export const UsersService = {
  getUsers,
  register,
  getUser,
  getProfileUser,
  updateProfile
};

async function getUsers(model) {
  const result = await api.post("users/users/fetch", model);
  return result;
}

async function getUser(id) {
  const result = await api.get(`users/users/${id}`);
  return result;
}

async function getProfileUser() {
  const result = await api.get(`users/users/profileUser `);
  return result;
}

async function register(model) {
  const result = await api.post(`users/users/createOrUpdate`, model);
  return result;
}

async function updateProfile(model) {
  const result = await api.post(`users/users/updateProfile`, model);
  return result;
}
