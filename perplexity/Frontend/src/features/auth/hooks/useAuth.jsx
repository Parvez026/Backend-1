import { useDispatch } from "react-redux";
import { setError, setLoading, setLogout, setUser } from "../auth.slice";
import { getMe, login, logout, register } from "../service/auth.api";

export const useAuth = () => {
  const dispatch = useDispatch();

  
async function handleRegister({ username, email, password }) {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await register({ username, email, password });

    return response;
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Registration failed")
    );

    throw error;
  } finally {
    dispatch(setLoading(false));
  }
}


  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch user data"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogout() {
    try {
      dispatch(setLoading(true));
      dispatch(setError(false));

      await logout();

      dispatch(setLogout())
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Logout failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
