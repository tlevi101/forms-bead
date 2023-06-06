import { ISurvey } from "../Types";
import { AnswerIcon, CopyIcon, DeleteIcon, EditIcon } from "../assets/Icons";
import { sendDeleteSurvey } from "./API";
import { useSelector } from "react-redux";
import { getAccessToken } from "../slices/UserSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SurveyProps = {
  survey: ISurvey;
  updateSurveys: () => void;
};
const Survey = ({ survey, updateSurveys }: SurveyProps) => {
  const accessToken = useSelector(getAccessToken);
  const navigate = useNavigate();
  const handleCopy = () => {
    const link = `${window.location.origin}/survey?hash=${survey.hash}`;
    navigator.clipboard.writeText(link);
  };
  const handleEdit = () => {
    navigate(`/surveys/${survey.id}/edit`);
  };
  const handleDelete = () => {
    if (!accessToken) {
      return;
    }
    sendDeleteSurvey(survey.id, accessToken).then((json) => {
      updateSurveys();
      console.log(json);
    });
  };

  const handleAnswer = () => {
    //TODO implement
  };
  return (
    <>
      <tr>
        <td className={"w-50"}>{survey.name}</td>
        <td>
          <div className={"d-flex gap-2 justify-content-center"}>
            <AnswerIcon clicked={handleAnswer} />
            <CopyIcon clicked={handleCopy} />
            <EditIcon clicked={handleEdit} />
            <DeleteIcon clicked={handleDelete} />
          </div>
        </td>
      </tr>
    </>
  );
};

export default Survey;
