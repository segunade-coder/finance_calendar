import { useContext } from "react";
import { UserContext } from "../../contexts/GlobalContext";

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  return { ...user, setUser };
};
