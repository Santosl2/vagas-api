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

    const {
      _remoteObject: { description: jobs },
    } = await job.evaluateHandle(() => {
      const findJobs = document.querySelectorAll(
        ".jobs-search__results-list > li",
      );

      const obj: IJobsResponse[] = [];
      let timeout;

      Array.from(findJobs).forEach(el => {
        const anchorURL = el.querySelector("a");
        const html_url = anchorURL?.getAttribute("href");

        const name = el
          .querySelector(".base-search-card__title")
          ?.textContent?.trim();

        const enterprise = el
          .querySelector(".base-search-card__subtitle")
          ?.textContent?.trim();

        // Get Job description

        if (name && enterprise && html_url) {
          let description = "";

          timeout = setTimeout(() => {
            anchorURL?.click();

            description =
              el
                .querySelector(".core-section-container__content")
                ?.textContent?.trim() || "";
          }, 1000);

          obj.push({
            body: description,
            html_url,
            title: `${name} na ${enterprise}`,
          });

          clearTimeout(timeout);
        }
      });

      console.log(obj);

      return obj;
    });

    console.log(jobs);
  }
}

export default Linkedin;
