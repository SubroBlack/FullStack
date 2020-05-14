type Result = string;

interface Numbers {
  height: number;
  weight: number;
}

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

try {
  console.log(calculateBmi(process.argv[2], process.argv[3]));
} catch (e) {
  console.log("Oops something went wrong ", e.message);
}
