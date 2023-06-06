import {ErrorResponse, SurveyResponse} from "../Types";


export const sendCreateSurvey = async (surveyContent: string, accessToken:string) => {
  const surveyName = surveyContent.split('\n\n')[0];
  surveyContent = surveyContent.split('\n\n').slice(1).join('\n\n');
  const response = await fetch(`http://localhost:3030/surveys`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'authorization': `Bearer ${accessToken}` },
    body: JSON.stringify({ name: surveyName, content: surveyContent})
  });
  if (!response.ok) {
    const json = await response.json() as ErrorResponse;
    throw new Error(json.message);
  }
  const json = await response.json();
  return json;
};

export const sendGetSurvey = async (surveyId:string, accessToken:string) => {
  const response = await fetch(`http://localhost:3030/surveys/${surveyId}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json', 'authorization': `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const json = await response.json() as ErrorResponse;
    throw new Error(json.message);
  }
  const json = await response.json() as SurveyResponse;
  return json;
}


export const sendModifySurvey = async (surveyContent: string, accessToken:string) => {
  const surveyName = surveyContent.split('\n\n')[0];
  surveyContent = surveyContent.split('\n\n').slice(1).join('\n\n');
  const response = await fetch(`http://localhost:3030/surveys`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json', 'authorization': `Bearer ${accessToken}` },
    body: JSON.stringify({ name: surveyName, content: surveyContent})
  });
  if (!response.ok) {
    const json = await response.json() as ErrorResponse;
    throw new Error(json.message);
  }
  const json = await response.json() as SurveyResponse;
  return json;
};