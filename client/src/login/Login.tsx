import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {InputsParam, LoginBody, ValidatorType} from "../Types";
import sendLogin from "./Api";
import {useDispatch} from "react-redux";
import MyForm from "../utils/MyForm";
import {login} from "../slices/UserSlice";


const inputs : InputsParam  = {
  email: {
    validators: [
      {type: ValidatorType.REQUIRED, message: "Email is required"},
      {type: ValidatorType.EMAIL, message: "Invalid email format"},
    ]
  },
  password: {
    validators: [
      {type: ValidatorType.REQUIRED, message: "Password is required"},
    ]
  }
}
const initialFormState = new MyForm(inputs);
const Login = () => {

  const [formState, setFormState] = useState(initialFormState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState(formState.validate("email", value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState(formState.validate("password", value));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.Valid) {
      return;
    }
    try{
      const body : LoginBody = {
        strategy: "local",
        email: formState.getInputValue("email") as string,
        password: formState.getInputValue("password") as string
      }
      const json = await sendLogin(body);
      dispatch(login({response: json}));
      navigate("/")
    }
    catch(e : any){
      formState.submit();
      setFormState(formState.setFormError("Email or password is incorrect!"));
    }
  }

  const onEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e);
    }
  }

  return (
    <div className={"popup"}>
      <form onSubmit={onSubmit} onKeyDown={onEnter}>
        <div className={"mb-1"}>
          <label className="from-label" htmlFor={"email"}>
            Email
          </label>
          <input
            type="email"
            className={`form-control passwordState ${formState.getInputClass("email")}`}
            id="email"
            placeholder="Email"
            onChange={handleEmailChange}
            onBlur={handleEmailChange}
          />
          <div className={`invalid-feedback ${formState.getInputError("email")}`}>
            {formState.getInputError("email")}
          </div>
        </div>
        <div className="mb-1">
          <label className="from-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${formState.getInputClass("password")}`}
            id="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            onBlur={handlePasswordChange}
            autoComplete={"on"}
          />
          <div className={`invalid-feedback ${formState.getInputErrorClass("password")}`}>
            {formState.getInputError("password")}
          </div>
        </div>
        <div className={`invalid-feedback ${formState.formErrorClass}`}>
          {formState.Error}
        </div>
        <div className="d-flex">
          <Link to={"/register "} className={"me-auto"}>
            <button className="btn btn-primary">Register</button>
          </Link>
          <button type="submit" className={`btn btn-primary ${formState.submitClass}`}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
