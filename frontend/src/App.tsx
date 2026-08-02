import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import {  Routes, Route, } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>

  );
}

export default App;
