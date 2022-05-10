import { createContext, useContext, useReducer, useState } from "react";
import { AuthReducer } from "../reducer/AuthReducer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("name");
  const [userName, setUserName] = useState(localStorage?.name);
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useReducer(AuthReducer, {
    field: {},
    passwordType: "password",
    emailErrState: false,
    passwordErrState: false,
    confirmPasswordErrState: false,
  });

  const signupHandler = async (e) => {
    e.preventDefault();
    if (
      state.field.email.indexOf("@") >= 0 &&
      state.field.password.length >= 8 &&
      state.field.confirmPassword === state.field.password
    ) {
      try {
        const response = await axios.post(`/api/auth/signup`, state.field);
        if (response.status === 201) {
          toast.success("Account created");
          navigate(location?.state?.from?.pathname || "/");
          localStorage.setItem("name", response.data.foundUser.firstName);
          localStorage.setItem("token", response.data.encodedToken);
          setUserName(user);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (state.field.email.indexOf("@") === -1) {
      dispatch({ type: "EMAIL_ERR" });
    } else {
      dispatch({ type: "EMAIL_ERR" });
    }

    if (state.field.password.length < 8) {
      dispatch({ type: "PASSWORD_ERR" });
    } else {
      dispatch({ type: "PASSWORD_ERR" });
    }

    if (state.field.password !== state.field.confirmPassword) {
      dispatch({ type: "CONFIRM_PASSWORD_ERR" });
    } else {
      dispatch({ type: "CONFIRM_PASSWORD_ERR" });
    }
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();

    if (state.field.email && state.field.password) {
      try {
        const response = await axios.post(`/api/auth/login`, state.field);

        if (response.status === 200) {
          toast.success("Login successfully");
          navigate(location?.state?.from?.pathname || "/");
          localStorage.setItem("name", response.data.foundUser.firstName);
          localStorage.setItem("token", response.data.encodedToken);
          setUserName(user);
        }
      } catch (error) {
        if (error.response.status === 404) {
          toast.warn("Account does not exist");
        }
      }
    }
    if (state.field.email.indexOf("@") === -1) {
      dispatch({ type: "EMAIL_ERR" });
    } else {
      dispatch({ type: "EMAIL_ERR" });
    }

    if (state.field.password.length < 8) {
      dispatch({ type: "PASSWORD_ERR" });
    } else {
      dispatch({ type: "PASSWORD_ERR" });
    }
  };

  const guestLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: "adarshbalika@gmail.com",
        password: "adarshBalika123",
      });
      if (response.status === 200) {
        toast.success("Login successfully");
        navigate(location?.state?.from?.pathname || "/");
        localStorage.setItem("name", response.data.foundUser.firstName);
        localStorage.setItem("token", response.data.encodedToken);
        setUserName(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {};

  return (
    <AuthContext.Provider
      value={{
        signupHandler,
        loginUserHandler,
        guestLoginHandler,
        token,
        state,
        userName,
        dispatch,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
