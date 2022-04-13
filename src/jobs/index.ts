/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import { api } from "services/API";

import { JobsResponse } from "./Jobs.types";

function getRepos(url: string[]): Promise<JobsResponse[]> {
  return Promise.all(url.map(u => api.get<JobsResponse[]>(`${u}/issues`))).then(
    values => values[0].data,
  );
}

export async function getAllJobs(urlRepo: string[]) {
  const repoSaves: JobsResponse[] = [];

  const repos = await getRepos(urlRepo);

  repos.forEach(repo => {
    repoSaves.push({
      title: repo.title,
      html_url: repo.html_url,
      labels: repo.labels,

      body: repo.body,
    });
  });

  return repoSaves;
}
