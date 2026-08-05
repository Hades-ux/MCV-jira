import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[50px_1fr] bg-[#0D1117] text-[#F0F6FC] font-['Inter']">
      <Header />
      <div className="flex">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
