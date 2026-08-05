import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route } from "react-router";
import { Layout }  from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<Layout />}>
        <Route path="/me" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
