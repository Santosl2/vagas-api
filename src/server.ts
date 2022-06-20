import express from "express";
import linkedinRouter from "jobs/Linkedin/Routes";
import jobsRouter from "routes";

// eslint-disable-next-line import/extensions
import "./jobs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/jobs", jobsRouter);
app.use("/linkedin", linkedinRouter);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
