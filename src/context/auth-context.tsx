import React, { createContext, useContext, useReducer } from "react";
import { AuthReducer, StateTypes, ActionTypes } from "../reducer/AuthReducer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNoteContext, useArchiveContext, useTrashContext } from "./index";

type AuthContextTypes = {
  signupHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loginUserHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  guestLoginHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  token: null | string;
  state: StateTypes;
  user: null | { firstName: string; lastName: string; email: string };
  dispatch: React.Dispatch<ActionTypes>;
  logoutHandler: () => void;
};

type AuthProviderTypes = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: AuthProviderTypes) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("userDetail")!);
  const navigate = useNavigate();
  const location: any = useLocation();
  const [state, dispatch] = useReducer(AuthReducer, {
    field: {},
    passwordType: "password",
  });
  const { setNotes } = useNoteContext();
  const { setArchives } = useArchiveContext();
  const { setTrashNotes } = useTrashContext();

  const signupHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          localStorage.setItem(
            "userDetail",
            JSON.stringify(response.data.createdUser)
          );
          localStorage.setItem("token", response.data.encodedToken);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loginUserHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      } catch (error) {}
    }
  };

  const guestLoginHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: "mikesch803@gmail.com",
        password: "mahendra123",
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

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within a authprovider");
  }
  return context;
};
