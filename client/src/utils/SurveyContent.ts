import { SurveyPage } from "../Types";

export const surveyContentDecoder = (
  surveyContent: string
): { surveyName: string; pages: SurveyPage[] } => {
  let pages = surveyContent.split("\n\n");
  const surveyName = pages[0];
  pages = pages.slice(1);
  return {
    surveyName: surveyName,
    pages: pages.map((page) => {
      const lines = page.split("\n");
      const pageName = lines[0];
      const questions = lines.slice(1);
      return { pageName: pageName, questions: questions };
    }),
  };
};

export const surveyContentEncoder = (
  surveyName: string,
  surveyPages: SurveyPage[]
): string => {
  return [
    surveyName,
    ...surveyPages.map((page) => {
      return `${page.pageName}\n${page.questions.join("\n")}`;
    }),
  ].join("\n\n");
};
