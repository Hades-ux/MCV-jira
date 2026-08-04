import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-base-100 grid grid-rows-[50px_1fr]">
      <Header />
      <div className="flex">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
