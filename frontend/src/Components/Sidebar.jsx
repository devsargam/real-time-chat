import React from "react";
import Infobox from "./Infobox";

const Sidebar = () => {
  return (
    <div className="border-r-2 px-2 m-1 w-max h-screen flex flex-col gap-4">
      <div className="logoContainer px-1 py-3">
        <p>Guff Gaff</p>
      </div>
      <div className="flex flex-col gap-1 ">
        <Infobox />
        <Infobox />
        <Infobox />
        <Infobox />
        <Infobox />
        <Infobox />
        <Infobox />
        <Infobox />
      </div>
    </div>
  );
};

export default Sidebar;
