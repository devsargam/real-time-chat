import React from "react";
import Sidebar from "../Sidebar";
import MainPage from "../MainPage";

const Homepage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <MainPage />
    </div>
  );
};

export default Homepage;
