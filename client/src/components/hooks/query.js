import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getAllPeople,
  getCashin,
  getCashout,
  getPeople,
  getPerson,
  getRoles,
  getSummary,
  getTask,
  getTasks,
} from "../services/api";

export const usePeople = (page) => {
  return useQuery({
    queryKey: ["people", { page }],
    queryFn: () => getPeople(page),
    placeholderData: keepPreviousData,
  });
};
export const useAllPeople = () => {
  return useQuery({
    queryKey: ["people"],
    queryFn: () => getAllPeople(),
  });
};
export const useTasks = (page) => {
  return useQuery({
    queryKey: ["tasks", { page }],
    queryFn: () => getTasks(page),
    placeholderData: keepPreviousData,
  });
};
export const useRole = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
};
export const useCashin = () => {
  return useQuery({
    queryKey: ["cashin"],
    queryFn: getCashin,
  });
};
export const useCashout = () => {
  return useQuery({
    queryKey: ["cashout"],
    queryFn: getCashout,
  });
};
export const useSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });
};
export const usePerson = (id) => {
  return useQuery({
    queryKey: ["people", { id }],
    queryFn: getPerson(id),
    enabled: !!id,
  });
};
export const useTask = (id) => {
  return useQuery({
    queryKey: ["tasks", { id }],
    queryFn: () => getTask(id),
    enabled: !!id,
  });
};
