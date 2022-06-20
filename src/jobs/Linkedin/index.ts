/* eslint-disable no-promise-executor-return */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

import { IJobsResponse } from "interface/Jobs";

import PuppeteerCore from "@puppeteer/Puppeteer";

class Linkedin {
  puppeteer: PuppeteerCore;

  constructor() {
    if (!this.puppeteer) {
      this.puppeteer = new PuppeteerCore();
    }
  }

  public async findJobs(url: string) {
    const job = await this.puppeteer.goToPage(url);

    const jobs = await job.evaluate(() => {
      const obj: IJobsResponse[] = [];

      const findJobs = document.querySelectorAll(
        ".jobs-search__results-list > li",
      );

      // let timeout;

      Array.from(findJobs).forEach(el => {
        const anchorURL = el.querySelector("a");
        const html_url = anchorURL?.getAttribute("href");

        const name = el
          .querySelector(".base-search-card__title")
          ?.textContent?.trim();

        const enterprise = el
          .querySelector(".base-search-card__subtitle")
          ?.textContent?.trim();

        const publishedTime = el.querySelector("time")?.textContent?.trim();

        if (name && enterprise && html_url) {
          const description = "";

          obj.push({
            id: obj.length + 1,
            title: `${name} na ${enterprise}`,
            publishedTime,
            html_url,
            body: description,
          });
        }
      });

      return obj;
    });

    await this.puppeteer.closeBrowserAndPage();

    return jobs;
  }
}

export default Linkedin;
