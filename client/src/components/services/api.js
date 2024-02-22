import axios from "axios";

export const ADMIN_BASE_URL = "http://localhost:3000/admin";

const axiosInstance = axios.create({
  baseURL: ADMIN_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addRole = async (role) => {
  (await axiosInstance.post("add-role", { role })).data;
};

export const getRoles = async () => {
  return (await axiosInstance.get("role")).data.data;
};
export const getPeople = async () => {
  return (await axiosInstance.get("people")).data.data;
};
export const getTasks = async () => {
  return (await axiosInstance.get("tasks")).data.data;
};
export const addPerson = async (person) => {
  return (await axiosInstance.post("create-person", person)).data;
};
export const deletePerson = async (id) => {
  return await axiosInstance.delete(`person?id=${id}`).data;
};
