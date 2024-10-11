const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: true,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};
