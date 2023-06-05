import {ErrorResponse, RegisterBody, RegisterResponse} from "../Types";


const sendRegister = async (data: RegisterBody) => {
  const response = await fetch('http://localhost:3030/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' }
  });
  if(!response.ok) {
    const json = await response.json() as ErrorResponse;
    if(response.status === 500){
      throw new Error("Email already used!");
    }
    throw new Error(json.message);
  }
  const json = await response.json() as RegisterResponse;
  return json;
}

export default sendRegister;