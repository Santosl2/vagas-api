/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import { api } from "services/API";

import { JobsResponse, Labels } from "./Jobs.types";

async function getRepos(url: string[]): Promise<JobsResponse[]> {
  return Promise.all(url.map(u => api.get<JobsResponse[]>(`${u}/issues`))).then(
    values => values[0].data,
  );
}

export async function getAllJobs(urlRepo: string[]) {
  const repoSaves: JobsResponse[] = [];

  const repos = await getRepos(urlRepo);

  repos.forEach(repo => {
    const labels = repo.labels.map(label => {
      const obj: Labels = {
        id: label.id,
        name: label.name,
        description: label.description,
        color: label.color,
      };

      return obj;
    });

    repoSaves.push({
      title: repo.title,
      html_url: repo.html_url,
      labels,
      body: repo.body,
    });
  });

  return repoSaves;
}
