import { Inputs, InputsParam, InputState, InputTypes } from "../Types";
import { ValidatorFunctions } from "./Validation";

export default class MyForm {
  private readonly inputs: Inputs = {};
  private readonly initialState: InputState = {
    value: "",
    error: "",
    touched: false,
  };
  private touched = false;
  private error = "";

  constructor(param: InputsParam | MyForm) {
    if(param instanceof MyForm){
      this.inputs =param.inputs;
      this.touched = param.Touched;
      this.error = param.error;
    }
    else{
      Object.keys(param).forEach((name) => {
        this.inputs[name] = {
          state: { ...this.initialState },
          validators: param[name].validators,
        };
      });
    }
  }

  public validate(name: string, value: InputTypes): MyForm {
    console.log("validate", name, value);
    const input = this.inputs[name];
    input.state.value = value;
    const validators = input.validators;
    const error = validators.reduce((prev, validator) => {
      if (prev !== "") {
        return prev;
      }
      let isValid;
      if (validator.expected) {
        const currValidator = ValidatorFunctions[validator.type] as (
          value: InputTypes,
          expected: any
        ) => boolean;
        isValid = currValidator(value, validator.expected);
      } else {
        const currValidator = ValidatorFunctions[validator.type] as (
          value: InputTypes
        ) => boolean;
        isValid = currValidator(value);
      }
      if (!isValid) {
        return validator.message;
      }
      return "";
    }, "");
    input.state.touched = true;
    input.state.error = error;
    input.state.valid = error === "";
    return new MyForm(this);
  }

  public getInputClass = (name:string) => {
    const inputState = this.inputs[name].state;
    if (!inputState.touched) {
      return "";
    }
    if (inputState.valid) {
      return "is-valid";
    }
    return "is-invalid";
  };

  public getInputError = (name:string) => {
    const inputState = this.inputs[name].state;
    if (!inputState.touched) {
      return "";
    }
    return inputState.error;
  }

  public getInputErrorClass = (name:string) => {
    const inputState = this.inputs[name].state;
    if (!inputState.touched || inputState.valid) {
      return "d-none";
    }
    return "d-block";
  }

  get submitClass(){
    if(!this.Touched && this.Valid){
      return "";
    }
    return "disabled";
  }

  get formErrorClass(){
    if(this.Touched && this.error === ""){
      return "d-none";
    }
    return "d-block";
  }

  public submit() {
    this.touched = true;
    return new MyForm(this);
  }

  public setFormError(error: string) {
    this.error = error;
    if(error === ""){
      this.Inputs.map((input) => {
        if(input.state.error === ""){
          delete input.state.valid;
          input.state.touched = false;
        }
        return input;
      });
    }
    else{
      this.Inputs.map((input) => {
        input.state.valid = false;
        input.state.touched = true;
        return input;
      });
    }
    return new MyForm(this);
  }
  public getInputState(name: string) {
    return this.inputs[name].state;
  }

  public getInputValue(name: string) {
    return this.inputs[name].state.value;
  }

  get Touched() {
    return this.touched;
  }

  get Valid() {
    return Object.values(this.inputs).every((input) => input.state.valid);
  }

  get Error() {
    return this.error;
  }

  get Inputs(){
    return Object.values(this.inputs);
  }

}
