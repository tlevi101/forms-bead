import {Link, useNavigate} from "react-router-dom";
import {InputsParam, ValidatorType} from "../Types";
import MyForm from "../utils/MyForm";
import React, {useState} from "react";
import sendRegister from "./Api";


const inputs : InputsParam = {
  fullname:{
    validators: [
      {type: ValidatorType.REQUIRED, message: "Name is required"},
    ]
  },
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


const Register = () => {
  const [formState, setFormState] = useState(initialFormState);
  const navigate = useNavigate();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    setFormState(formState.validate(e.target.name,e.target.value));
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.Valid) {
      return;
    }
    formState.submit();
    try{
      const body = {
        email: formState.getInputValue("email") as string,
        password: formState.getInputValue("password") as string,
        fullname: formState.getInputValue("fullname") as string
      }
      await sendRegister(body)
      navigate("/login");
    }
    catch(e : any){
      setFormState(formState.setFormError(e.message));
    }
  }

  const onEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e);
    }
  }


  return (
    <div className="d-flex justify-content-center container-center">
      <form onKeyDown={onEnter} onSubmit={onSubmit}>
        <div className={"mb-1"}>
          <label className="from-label" htmlFor="fullname">
            Name
          </label>
          <input
            type="text"
            name={"fullname"}
            className={`form-control ${formState.getInputClass("fullname")}`}
            id="fullname"
            placeholder="Name"
            onChange={changeHandler}
            onBlur={changeHandler}
          />
          <div className={`invalid-feedback ${formState.getInputErrorClass("fullname")}`}>
            {formState.getInputError("fullname")}
          </div>
        </div>
        <div className={"mb-1"}>
          <label className="from-label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name={"email"}
            className={`form-control ${formState.getInputClass("email")}`}
            id="email"
            placeholder="Eamil"
            onChange={changeHandler}
            onBlur={changeHandler}
          />
          <div className={`invalid-feedback ${formState.getInputErrorClass("email")}`}>
            {formState.getInputError("email")}
          </div>
        </div>
        <div className="mb-1">
          <label className="from-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name={"password"}
            className={`form-control ${formState.getInputClass("password")}`}
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            onBlur={changeHandler}
          />
          <div className={`invalid-feedback ${formState.getInputErrorClass("password")}`}>
            {formState.getInputError("password")}
          </div>
        </div>
        <div className={`invalid-feedback ${formState.formErrorClass}`}>
          {formState.Error}
        </div>
        <div className="d-flex">
          <Link to={"/login"} className={"me-auto"}>
            <button className="btn btn-primary">Login</button>
          </Link>
          <button type="submit" className={`btn btn-primary ${formState.submitClass}`}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
