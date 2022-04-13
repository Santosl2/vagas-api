import express from "express";
import jobsRouter from "routes";

// eslint-disable-next-line import/extensions
import "./jobs/index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/jobs", jobsRouter);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
