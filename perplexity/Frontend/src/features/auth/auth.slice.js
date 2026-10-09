import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLogout: (state) => {
      ((state.user = null), (state.error = false));
    },
  },
});

export const { setUser, setError, setLoading,setLogout } = authSlice.actions;
export default authSlice.reducer;
