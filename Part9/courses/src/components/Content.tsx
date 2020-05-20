import React from "react";
import { CourseProps } from "../types";
import Part from "./Part";

const Content: React.FC<CourseProps> = (props) => {
  const courses = props.courses;

  return (
    <div>
      <h4>Parts of the Courses</h4>
      {courses.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
