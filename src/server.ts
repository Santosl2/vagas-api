import express from "express";

import githubRouter from "@/jobs/Github/Routes";
import linkedinRouter from "@/jobs/Linkedin/Routes";

// eslint-disable-next-line import/extensions
import "./jobs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/github", githubRouter);
app.use("/linkedin", linkedinRouter);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
