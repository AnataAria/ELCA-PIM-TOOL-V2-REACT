import React, { useState } from "react";
import ProjectList from "./ProjectList";
import ProjectPage from "./ProjectPage";

const MainPage = () => {
  const [selectedPage, setSelectedPage] = useState(<ProjectList />);

  return (
    <div className="container">
      <div
        className="right-column"
        style={{ paddingRight: 100, paddingLeft: 50 }}
      >
        {selectedPage}
      </div>
    </div>
  );
};

export default MainPage;
