import {ErrorResponse} from "../Types";


export const getAllSurveys = async (userId:string, accessToken:string) => {
  const response = await fetch(`http://localhost:3030/surveys?userId=${userId}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json', 'authorization': `Bearer ${accessToken}` }
  });
  if(!response.ok) {
    const json = await response.json() as ErrorResponse;
    throw new Error(json.message);
  }
  const json = await response.json();
  return json;
}

export const sendDeleteSurvey = async (id:number, accessToken:string) => {
  const response = await fetch(`http://localhost:3030/surveys/${id}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json', 'authorization': `Bearer ${accessToken}` }
  });
  if(!response.ok) {
    const json = await response.json() as ErrorResponse;
    throw new Error(json.message);
  }
  const json = await response.json();
  return json;
}