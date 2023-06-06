import {InputTypes} from "../Types";
import {surveyContentDecoder} from "./SurveyContent";


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
  }
}

export const validateSurveyInput  = (input:string) =>{
  if(!input || input===''){
    return "Survey content is empty";
  }
  const {surveyName, pages} = surveyContentDecoder(input);
  if(!surveyName){
    return "Survey name is empty";
  }
  if(!pages || pages.length === 0){
    return "Survey pages is empty";
  }
  const pageErrors = pages.map((page) => {
    if(!page.pageName){
      return `Page "${page.pageName}" name is empty`;
    }
    if(!page.questions){
      return `Page "${page.pageName}" questions is empty`;
    }
    if(page.questions.length === 0){
      return `Page "${page.pageName}" questions is empty`;
    }
    const questionErrors = page.questions.map((question) => {
      if(!question || question === ""){
        return `Page "${page.pageName}" question is empty`;
      }
      return;
    }).filter((error) => error !== undefined).join("\n");
    return questionErrors === "" ? undefined : `Page "${page.pageName}" questions errors:\n${questionErrors}`;
  }).filter((error) => error !== undefined).join("\n");
  return pageErrors=== "" ? undefined : `Survey pages errors:\n${pageErrors}`
}

