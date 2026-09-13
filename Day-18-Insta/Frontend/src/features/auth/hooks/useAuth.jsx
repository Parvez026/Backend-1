import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handelLogin = async (username, password) => {
    setLoading(true);

    const response = await login(username, password);
    setUser(response.user);

    setLoading(false);
  };

  const handelRegister=async (username,email,password)=>{
    setLoading(true)

    const response=await register(username,email,password)
    setUser(response.user)

    setLoading(false)
  }
 
  const handelGetMe=async()=>{
    const response=await getMe()

   setUser(response.user)
  }
  return {
    user,
    loading,
    handelLogin,
    handelRegister,
    handelGetMe
  };
};
