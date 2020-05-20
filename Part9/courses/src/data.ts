import { CoursePart } from "./types";

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
  },
  {
    name: "Typescript Part",
    exerciseCount: 27,
    description:
      "This is by the worst part of the course. The instructions are not really clear and it is hard to follow and finish the exercises. Need to refer to external documents just to be able to finish the exercises",
  },
];

export default courseParts;
