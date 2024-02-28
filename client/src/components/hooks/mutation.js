import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addPerson,
  addRole,
  deletePerson,
  deleteTask,
  updatePerson,
  updateTask,
} from "../services/api";
import { toast } from "sonner";
export const useAddRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (role) => addRole(role),
    onSettled: async (data, err) => {
      if (err) {
        toast.error("Something went wrong.", { id: "add role" });
      } else {
        toast.success("Successful", { id: "add role" });
        await queryClient.invalidateQueries({ queryKey: ["roles"] });
      }
    },
  });
};
export const useAddPerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (person) => addPerson(person),
    onSettled: async (data, err) => {
      if (err) {
        toast.error("Something went wrong.", { id: "user" });
      }
      if (data.status) {
        toast.success("User Created", { id: "user" });
        await queryClient.invalidateQueries({ queryKey: ["people"] });
      } else if (!data.status) {
        toast.error(data.message, { id: "user" });
      }
    },
  });
};
export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updatePerson(data),
    onSettled: async (data, err) => {
      if (err) {
        toast.error("Something went wrong.", { id: "person" });
      }
      if (data.status) {
        await queryClient.invalidateQueries({ queryKey: ["people"] });
      } else if (!data.status) {
        toast.error(data.message, { id: "person" });
      }
    },
  });
};
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task) => updateTask(task),
    onSettled: async (data, err) => {
      if (err) {
        toast.error("Something went wrong.", { id: "task" });
      }
      if (data.status) {
        toast.success("Updated", { id: "task" });
        await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      } else if (!data.status) {
        toast.error(data.message, { id: "task" });
      }
    },
  });
};
export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePerson(id),
    onSettled: async (data, err) => {
      if (err) {
        toast.error("Something went wrong.", { id: "delete user" });
      } else {
        toast.success("User deleted", { id: "delete user" });
        await queryClient.invalidateQueries({ queryKey: ["people"] });
      }
    },
  });
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteTask(id),
    onSettled: async (data, err) => {
      if (err) {
        toast.error("Something went wrong.", { id: "delete task" });
      } else {
        toast.success("Task deleted", { id: "delete task" });
        await queryClient.invalidateQueries({ queryKey: ["people"] });
      }
    },
  });
};
