import axios from "axios";

export const Simulator = async (algorithm, input, setSteps) => {
  try {
    const res = await axios.post("http://localhost:8000/simulate", {
      algorithm: algorithm,
      input: input,
    });
    setSteps(res.data.steps);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};
