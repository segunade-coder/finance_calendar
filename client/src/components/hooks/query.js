import { useQuery } from "@tanstack/react-query";
import { getPeople, getRoles, getTasks } from "../services/api";

export const usePeople = () => {
  return useQuery({
    queryKey: ["people"],
    queryFn: getPeople,
  });
};
export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};
export const useRole = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
};
