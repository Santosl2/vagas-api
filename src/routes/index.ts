import { Request, Response, Router } from "express";
import { getAllJobs } from "jobs";

import { backRepos, frontRepos } from "@config/ReposConfig";

const jobsRouter = Router();

const getReposConfig: any[string] = {
  backend: backRepos,
  frontend: frontRepos,
};

jobsRouter.get("/:type", async (req: Request, res: Response) => {
  const { type } = req.params ?? "frontend";

  const allJobs = await getAllJobs(getReposConfig[type]);

  if (allJobs) {
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=60;max-age=60",
    );

    return res.json(allJobs);
  }
  return res.status(404).json({ message: "Not Found" });
});

export default jobsRouter;
