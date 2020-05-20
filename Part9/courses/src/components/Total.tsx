import React from "react";

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div>
      <br />
      <b>Number of exercises: </b>
      {props.total}
    </div>
  );
};

export default Total;
