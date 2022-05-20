import { createContext, useContext, useReducer } from "react";
import { AuthReducer } from "../reducer/AuthReducer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNoteContext, useArchiveContext, useTrashContext } from "./index";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("userDetail"));
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useReducer(AuthReducer, {
    field: {},
    passwordType: "password",
    emailErrState: false,
    passwordErrState: false,
    confirmPasswordErrState: false,
  });
  const { setNotes } = useNoteContext();
  const { setArchives } = useArchiveContext();
  const { setTrashNotes } = useTrashContext();

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
          localStorage.setItem("userDetail", response.data.createdUser);
          localStorage.setItem("token", response.data.encodedToken);
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
          toast("Login successfully");
          navigate(location?.state?.from?.pathname || "/");
          localStorage.setItem(
            "userDetail",
            JSON.stringify(response.data.foundUser)
          );
          localStorage.setItem("token", response.data.encodedToken);
        }
      } catch (error) {
        if (error.response.status === 404) {
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
        toast("Login successfully");
        navigate(location?.state?.from?.pathname || "/");
        localStorage.setItem(
          "userDetail",
          JSON.stringify(response.data.foundUser)
        );
        localStorage.setItem("token", response.data.encodedToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    setNotes([]);
    setArchives([]);
    setTrashNotes([]);
    localStorage.clear();
    toast.success("Logout successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        signupHandler,
        loginUserHandler,
        guestLoginHandler,
        token,
        state,
        user,
        dispatch,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
