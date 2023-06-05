import {InputTypes} from "../Types";


export const validateEmailFormat = (email:string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



export const ValidatorFunctions = {
  "email": validateEmailFormat,
  "required": (value: InputTypes) => {
    return value !== undefined && value !== null && value !== "";
  },
  "min": (value: InputTypes, min: number) => {
    if(Array.isArray(value)){
      return value.length >= min;
    }
    if(typeof value === "string"){
      return value.length >= min;
    }
    if(typeof value === "number"){
      return value >= min;
    }
  },
  "max": (value: InputTypes, max: number) => {
    if(Array.isArray(value)){
      return value.length <= max;
    }
    if(typeof value === "string"){
      return value.length <= max;
    }
    if(typeof value === "number"){
      return value <= max;
    }
  }
}

