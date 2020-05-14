interface ExerciseChart {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Values {
  target: number;
  log: Array<number>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseInputs = (body: any): Values => {
  if (isNaN(Number(body.target))) {
    throw new Error("Provide Numbers");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body.daily_exercises.forEach((n: any) => {
    if (isNaN(Number(n))) {
      throw new Error("Provide Numbers");
    }
    return Number(n);
  });
  const target = Number(body.target);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chart = body.daily_exercises.map((n: any) => Number(n));
  return {
    target: target,
    log: chart,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateExercise = (body: any): ExerciseChart => {
  const { target, log } = parseInputs(body);

  if (log.length < 1) {
    throw new Error("Parameters Missing");
  }
  const reducer = (acc: number, currentValue: number): number =>
    acc + currentValue;
  const sum = log.reduce(reducer);
  const average = sum / log.length;

  interface Rating {
    rating: number;
    ratingDescription: string;
  }

  const rate = (average: number, target: number): Rating => {
    console.log("Target Received", target);
    if (average < (3 / 4) * target) {
      return {
        rating: 1,
        ratingDescription: "Real Bad, need improvement",
      };
    } else if (average < target) {
      return {
        rating: 2,
        ratingDescription: "Not Too Bad, could be better",
      };
    } else {
      return {
        rating: 2,
        ratingDescription: "Great Job, keep it up",
      };
    }
  };
  const rateResult = rate(average, target);

  return {
    periodLength: log.length,
    trainingDays: log.filter((d) => d !== 0).length,
    success: average > target,
    rating: rateResult.rating,
    ratingDescription: rateResult.ratingDescription,
    target: target,
    average: average,
  };
};
