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

const calculateBmi = (h: number, w: number): Result => {
  if (!(h > 0) || !(w > 0)) {
    throw new Error("Enter Valid Height and Weight");
  }
  const bmi = w / ((h / 100) * (h / 100));
  if (bmi < 18.6) {
    return "Low (Light Weight)";
  } else if (bmi < 25) {
    return "Normal (Healthy Weight)";
  } else {
    return "High (Heavy Weight)";
  }
};

try {
  const body = parseArguments(process.argv[2], process.argv[3]);
  console.log(calculateBmi(body.height, body.weight));
} catch (e) {
  console.log("Oops something went wrong ", e.message);
}
