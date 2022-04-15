import { Request, Response, Router } from "express";

import Linkedin from "./Linkedin";

const router = Router();

const linkedin = new Linkedin();

router.get("/", async (req: Request, res: Response) => {
  const findJobs = await linkedin.findJobs(
    "https://br.linkedin.com/jobs/search?keywords=Frontend%20junior&location=Brasil&geoId=106057199&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0",
  );

  res.setHeader(
    "Cache-Control",
    "public, immutable, no-transform, s-maxage=60;max-age=60",
  );

  // return res.status(404).json({ message: "Not Found" });
  return res.status(200).json({ message: "Not Found" });
});

export default router;
