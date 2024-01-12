import Sidenav from "../Common/Sidenav";
import client from "../../api/client";
import { useState } from "react";

const MainSection = () => {
  client.get("my_team").then((data) => console.log(data));
  client.get("my_project").then((data) => console.log(data));
  return (
    <div className="flex-1 mt-[70px] flex">
      <Sidenav />
      <div className="flex-1"></div>
    </div>
  );
};

export default MainSection;
