import { Request, Response, Router } from "express";
import { getAllJobs } from "jobs";

import { backRepos, frontRepos } from "@/config/ReposConfig";
import { CACHE_KEY } from "@/constants";
import { getCache, saveOnCache } from "@/middlewares/Cache";

const githubRouter = Router();

const getReposConfig: any[string] = {
  backend: backRepos,
  frontend: frontRepos,
};

githubRouter.get("/:type", async (req: Request, res: Response) => {
  const { type } = req.params ?? "frontend";

  const key = CACHE_KEY(req);
  const cachedBody = getCache(key);

  if (cachedBody) {
    return res.status(200).json(cachedBody);
  }

  const allJobs = await getAllJobs(getReposConfig[type]);

  if (allJobs) {
    console.log(`Searching from jobs in GitHub ${type} `);

    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=60;max-age=60",
    );

    console.log(`Finished! ${type} `);

    saveOnCache(10, key, allJobs);

    return res.json(allJobs);
  }

  return res.status(404).json({ message: "Not Found" });
});

export default githubRouter;
