import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Layout from "./Layout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout/>}>
          <Route index element={<h1>HOME</h1>}></Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
