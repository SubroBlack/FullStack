import React from "react";
import { connect } from "react-redux";
import { search } from "../reducers/filterReducer";

const Filter = (props) => {
  const style = {
    margin: 10,
  };

  const handleChange = (event) => {
    event.preventDefault();
    props.search(event.target.value);
  };
  return (
    <div style={style}>
      <input name="filter" default="search" onChange={handleChange} />
    </div>
  );
};

export default connect(null, { search })(Filter);
