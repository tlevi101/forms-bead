import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Layout from "./Layout";
import Home from "./Home/Home";
import Surveys from "./Surveys/Surveys";
import SurveyEditor from "./survey-editor/SurveyEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path={"/surveys"} element={<Surveys />} />
          <Route path={"/surveys/new"} element={<SurveyEditor/>} />
          <Route path={"/surveys/:surveyId/edit"} element={<SurveyEditor/>} />
          <Route path={"/answers"} element={<div>Answers</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
