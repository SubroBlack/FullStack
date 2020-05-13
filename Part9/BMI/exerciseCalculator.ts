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

const parseInputs = (args: Array<any>): Values => {
  const target = Number(args[2]);
  const chart = args.slice(3).map((n) => Number(n));
  return {
    target: target,
    log: chart,
  };
};

const calculateExercise = (
  exercise: Array<number>,
  exerciseTarget: number
): ExerciseChart => {
  if (exercise.length < 1) {
    throw new Error("No data given");
  }
  const reducer = (acc: number, currentValue: number): number =>
    acc + currentValue;
  const sum = exercise.reduce(reducer);
  const average = sum / exercise.length;

  interface Rating {
    rating: number;
    ratingDescription: string;
  }

  const rate = (average: number, target: number): Rating => {
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
  const rateResult = rate(average, exerciseTarget);

  return {
    periodLength: exercise.length,
    trainingDays: exercise.filter((d) => d !== 0).length,
    success: average > exerciseTarget,
    rating: rateResult.rating,
    ratingDescription: rateResult.ratingDescription,
    target: exerciseTarget,
    average: average,
  };
};

try {
  const { target, log } = parseInputs(process.argv);
  console.log(calculateExercise(log, target));
} catch (e) {
  console.log("Error: ", e.message);
}
