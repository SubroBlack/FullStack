import React from "react";
import { PartProps } from "../types";

const Part: React.FC<PartProps> = (props) => {
  const part = props.part;
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <b>{part.name}</b>
          <br />
          {part.description}
          <br />
          {part.exerciseCount}
        </div>
      );

    case "Using props to pass data":
      return (
        <div>
          <b>{part.name}</b>
          <br />
          {part.exerciseCount}
          <br />
          {part.groupProjectCount}
        </div>
      );

    case "Deeper type usage":
      return (
        <div>
          <b>{part.name}</b>
          <br />
          {part.description}
          <br />
          {part.exerciseCount}
          <br />
          {part.exerciseSubmissionLink}
        </div>
      );

    case "Typescript Part":
      return (
        <div>
          <b>{part.name}</b>
          <br />
          {part.description}
          <br />
          {part.exerciseCount}
        </div>
      );

    default:
      console.log(part);
      return assertNever(part);
  }
};

export default Part;
