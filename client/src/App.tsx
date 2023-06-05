import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Layout from "./Layout";
import Home from "./Home/Home";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
