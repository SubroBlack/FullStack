export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CourseWithDescription extends CoursePartBase {
  name: string;
  description?: string;
}

export interface CoursePartOne extends CourseWithDescription {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CourseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface AddedCourse extends CourseWithDescription {
  name: "Typescript Part";
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | AddedCourse;

export type PartProps = {
  part: CoursePart;
};

export type CourseProps = {
  courses: CoursePart[];
};
