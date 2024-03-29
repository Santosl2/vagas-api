import { Request, Response, Router } from "express";

import { getCache, saveOnCache } from "@/middlewares/Cache";

import Linkedin from ".";
import { CACHE_KEY } from "../../constants";

const router = Router();

const linkedin = new Linkedin();

router.get("/:rank/:type", async (req: Request, res: Response) => {
  const key = CACHE_KEY(req);
  const cachedBody = getCache(key);

  if (cachedBody) {
    return res.status(200).json(cachedBody);
  }

  const { type, rank } = req.params;

  const filter = `desenvolvedor%20${rank}%20${type}`;

  console.log(`Searching from jobs in Linkedin ${type} ${rank}`);

  const findJobs = await linkedin.findJobs(
    `https://br.linkedin.com/jobs/search?keywords=${filter}&location=Brasil&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0&sortBy=DD&f_TPR=r604800`,
  );

  res.setHeader(
    "Cache-Control",
    "public, immutable, no-transform, s-maxage=60;max-age=60",
  );

  saveOnCache(10, key, findJobs);

  console.log(`Finished! ${type} ${rank}`);

  return res.status(200).json(findJobs);
});

export default router;
