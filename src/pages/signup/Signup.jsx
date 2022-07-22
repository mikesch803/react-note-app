import { Link } from "react-router-dom";
import { PasswordNotShowIcon, PasswordShowIcon } from "../../assests/icons";
import { useAuthContext } from "../../context";
import { useTitle } from "../../hooks/useTitle";
import { useValidation } from "../../hooks/useValidation";
import "./Signup.css";

export function Signup() {
  const { signupHandler, state, dispatch } = useAuthContext();
  const { formValidation, errMsg } = useValidation();
  useTitle("Signup");
  return (
    <div className="signup-page">
      <form
        className="form form-signup"
        onSubmit={(e) => {
          formValidation(
            state.field.email,
            state.field.password,
            state.field.confirmPassword
          );
          signupHandler(e);
        }}
      >
        <h2 className="title-form">Signup</h2>
        <div className="parent-div">
          <input
            type="text"
            placeholder="first name"
            className="form-input flex-1"
            name="firstName"
            onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
            required
          />
          <input
            type="text"
            placeholder="last name"
            className="form-input flex-1"
            name="lastName"
            onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
            required
          />
        </div>
        <input
          type="text"
          placeholder="email"
          className="form-input"
          name="email"
          onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
          required
        />
        <small className="form-error">{errMsg.email}</small>
        <div className="parent-div">
          <input
            type={state.passwordType}
            placeholder="password"
            className="form-input flex-1"
            name="password"
            onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
            required
          />
          <span
            className="form-passwordeye"
            onClick={() => dispatch({ type: "CHANGE_TYPE" })}
          >
            {state.passwordType === "text" ? (
              <PasswordShowIcon />
            ) : (
              <PasswordNotShowIcon />
            )}
          </span>
        </div>
        <small className="form-error">{errMsg.password}</small>
        <div className="parent-div">
          <input
            type={state.passwordType}
            placeholder="confirm password"
            className="form-input flex-1"
            name="confirmPassword"
            onChange={(e) => dispatch({ type: "ADD_FIELD", payload: e.target })}
            required
          />
          <span
            className="form-passwordeye"
            onClick={() => dispatch({ type: "CHANGE_TYPE" })}
          >
            {state.passwordType === "text" ? (
              <PasswordShowIcon />
            ) : (
              <PasswordNotShowIcon />
            )}
          </span>
        </div>
        <small className="form-error">{errMsg.confirmPassword}</small>
        <button className="btn btn-primary form-btn" type="submit">
          create new account
        </button>
        <Link to="/login" className="btn btn-link link-account">
          Already have an account
        </Link>
      </form>
    </div>
  );
}
