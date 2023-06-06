import Pagination from "../pagination/Pagination";
import { Link, useSearchParams } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import { getAllSurveys } from "./API";
import { useSelector } from "react-redux";
import { getAccessToken } from "../slices/UserSlice";
import Survey from "./Survey";
import { ISurvey } from "../Types";

const Surveys = () => {
  const PAGE_SIZE = 3;
  const [params, setParams] = useSearchParams();
  const accessToken = useSelector(getAccessToken);
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const [surveyComponents, setSurveyComponents] = useState<JSX.Element[]>([]);

  const updateSurveyComponents = (
    surveysList: ISurvey[],
    start = 0,
    end = PAGE_SIZE
  ) => {
    setSurveyComponents(
      surveysList
        .map((survey: ISurvey) => {
          return (
            <Survey
              key={`Survey-${survey.hash}`}
              survey={survey}
              updateSurveys={updateSurveys}
            ></Survey>
          );
        })
        .slice(start, end)
    );
  };
  const updateSurveys = () => {
    const userId = params.get("userId");
    if (userId && accessToken) {
      getAllSurveys(userId, accessToken).then((json) => {
        setSurveys(json.data);
        updateSurveyComponents(json.data);
      });
    }
  };
  useEffect(() => {
    updateSurveys();
  }, [params, accessToken]);

  useEffect(() => {
    console.log("surveys changed");
    console.log(surveys);
  }, [surveys]);

  const handlePageTurn = (page: number) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    console.log(surveys.slice(start, end));
    updateSurveyComponents(surveys, start, end);
    console.log(page);
  };
  return (
    <>
      <h1 className={"text-center text-primary mt-5"}>My Surveys</h1>
      <div className={`container mt-5`}>
        <div className={surveys.length > 0 ? "" : "d-none"}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{...surveyComponents}</tbody>
          </table>
          <Pagination
            key={"pagination-" + surveys.length}
            collectionSize={surveys.length}
            pageSize={PAGE_SIZE}
            pageTurn={handlePageTurn}
          />
        </div>
        <div
          className={`alert alert-info text-center  ${
            surveys.length > 0 ? "d-none" : ""
          }`}
          role="alert"
        >
          No data found
        </div>
        <div className={"d-flex justify-content-center"}>
          <Link to={"/surveys/new"}>
            <button className={"btn btn-primary"}>New Survey</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Surveys;
