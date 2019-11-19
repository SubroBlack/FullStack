import React from "react";

const Header = props => {
  return <h1>{props.name}</h1>;
};

const Part = props => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = props => {
  const showParts = () =>
    props.parts.map(part => (
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    ));
  return showParts();
};

const Total = props => {
  const reducer = (acc, crt) => acc + crt;
  const total = props.parts.map(part => part.exercises).reduce(reducer);
  return <b>Number of exercises {total}</b>;
};

const Course = props => {
  const showCourses = () => {
    return props.courses.map(course => (
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ));
  };
  return <div>{showCourses()}</div>;
};

export default Course;
