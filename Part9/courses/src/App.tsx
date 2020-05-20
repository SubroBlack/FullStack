import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

import courseParts from "./data";

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total
        total={courseParts.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      />
    </div>
  );
};

export default App;
