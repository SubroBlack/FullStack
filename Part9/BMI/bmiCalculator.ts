type Result = string;

interface Numbers {
  height: number;
  weight: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseArguments = (h: any, w: any): Numbers => {
  if (!isNaN(Number(h)) && !isNaN(Number(w))) {
    return {
      height: Number(h),
      weight: Number(w),
    };
  } else {
    throw new Error("Provide Numbers");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateBmi = (h: any, w: any): Result => {
  const { height, weight } = parseArguments(h, w);
  if (!(height > 0) || !(weight > 0)) {
    throw new Error("Enter Valid Height and Weight");
  }
  const bmi = weight / ((height / 100) * (height / 100));
  if (bmi < 18.6) {
    return "Low (UnderWeight)";
  } else if (bmi < 25) {
    return "Normal (Healthy Weight)";
  } else {
    return "High (OverWeight)";
  }
};
