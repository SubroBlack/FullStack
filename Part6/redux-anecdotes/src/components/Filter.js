import React from "react";
import { useDispatch } from "react-redux";

import { search } from "../reducers/filterReducer";

const Filter = () => {
  const style = {
    margin: 10,
  };

  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    /*if (event.target.value.length > 0) {
      dispatch(search(event.target.value));
    } */
    dispatch(search(event.target.value));
  };
  return (
    <div style={style}>
      <input name="filter" default="search" onChange={handleChange} />
    </div>
  );
};

export default Filter;
