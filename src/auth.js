import { reactive, computed } from "vue";

const state = reactive({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
});

export const useAuth = () => {
  const isAuthenticated = computed(() => !!state.token);

  const login = (userData, token) => {
    state.user = userData;
    state.token = token;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    state.user = null;
    state.token = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return {
    state,
    isAuthenticated,
    login,
    logout,
  };
};
