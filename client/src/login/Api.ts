import {ErrorResponse, LoginBody, LoginResponse} from "../Types";

const sendLogin = async (body:LoginBody) : Promise<LoginResponse | never> => {
  const response = await fetch('http://localhost:3030/authentication', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' }
  });
  if(!response.ok) {
    const json = await response.json() as ErrorResponse;
    throw new Error(json.message);
  }
  const json = await response.json() as LoginResponse
  // login({response: json});
  return json;
}

export default sendLogin;