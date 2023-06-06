export interface LoginBody {
  readonly strategy: 'local';
  email: string;
  password: string;
}
export interface User {
  readonly id: number;
  readonly email: string;
  readonly fullname: string;
}
export interface LoginResponse {
  readonly accessToken: string;
  user: User;
}
export interface ErrorResponse {
  readonly code: number;
  readonly message: string;
  readonly name: string;
  readonly className: string;
}

export interface RegisterBody {
  fullname: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  readonly id: number;
  readonly fullname: string;
  readonly email: string;
}



export enum ValidatorType{
  EMAIL = "email",
  REQUIRED = "required",
}
export type InputTypes =  string | undefined | null
export type Inputs = {[name:string]: {state: InputState, validators: {type:ValidatorType, expected?:number, message:string}[]}};
export type InputsParam = {[name:string]: {validators: {type:ValidatorType, expected?:number, message:string}[]}};

export interface InputState {
  value: InputTypes
  error: string;
  touched: boolean;
  valid?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface PaginationProps {
  collectionSize: number;
  pageSize: number;
  pageTurn: (page:number) => void;
}

export interface ISurvey {
  readonly id: number;
  name: string;
  content: string;
  readonly userId: number;
  readonly createdAt: string;
  readonly hash: string;
  readonly user: User;
}

export interface SurveyPage{
  pageName: string;
  questions: string[];
}

export interface SurveyResponse {
  id:number;
  content: string;
  name:string;
  hash:string;
  createdAt:number;
  user:User;
}