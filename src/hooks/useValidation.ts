import { useState } from "react";
export function useValidation() {

  type ErrMsgTypes = {
    email : string;
    password : string;
    confirmPassword : string;
  }

  const [errMsg, setErrMsg] = useState<ErrMsgTypes>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formValidation = (email:string, password:string, confirmPassword:string) => {
    let errors = { ...errMsg };
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors = { ...errors, email: "" };
    } else {
      errors = { ...errors, email: "invalid email" };
    }
    if (password && password.length < 8) {
      errors = {
        ...errors,
        password: "password should be greater than 8 chars",
      };
    } else {
      errors = { ...errors, password: "" };
    }

    if (confirmPassword && confirmPassword !== password) {
      errors = { ...errors, confirmPassword: "pasword is should match" };
    } else {
      errors = { ...errors, confirmPassword: "" };
    }

    setErrMsg(errors);
  };

  return { formValidation, errMsg };
}