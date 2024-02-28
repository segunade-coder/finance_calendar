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
export const getPeople = async (page = 1) => {
  return (await axiosInstance.get(`people?_page=${page}&_limit=4`)).data;
};
export const getAllPeople = async () => {
  return (await axiosInstance.get(`all-people`)).data.data;
};
export const getTasks = async (page = 1) => {
  return (await axiosInstance.get(`tasks?_page=${page}&_limit=6`)).data;
};
export const getNotApprovedTask = async (page = 1) => {
  return (await axiosInstance.get(`not-approved?_page=${page}&_limit=6`)).data;
};
export const addPerson = async (person) => {
  return (await axiosInstance.post("create-person", person)).data;
};
export const updateTask = async (task) => {
  return (await axiosInstance.put("task", task)).data;
};
export const updatePerson = async (data) => {
  return (await axiosInstance.put("person", data)).data;
};
export const deletePerson = async (id) => {
  return await axiosInstance.delete(`person?id=${id}`).data;
};
export const deleteTask = async (id) => {
  return await axiosInstance.delete(`task?id=${id}`).data;
};
export const getCashin = async () => {
  return (await axiosInstance.get("cashin")).data.data;
};
export const getCashout = async () => {
  return (await axiosInstance.get("cashout")).data.data;
};
export const getSummary = async () => {
  return (await axiosInstance.get("summary")).data.data;
};
export const getPerson = async (id) => {
  return (await axiosInstance.get(`person?id=${id}`)).data.data;
};
export const getTask = async (id) => {
  return (await axiosInstance.get(`task?id=${id}`)).data.data;
};
