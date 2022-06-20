/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import { IJobsResponse, ILabels } from "@/interface/Jobs";
import { api } from "@/services/API";

async function getRepos(url: string[]): Promise<IJobsResponse[]> {
  return Promise.all(
    url.map(u => api.get<IJobsResponse[]>(`${u}/issues`)),
  ).then(values => values[0].data);
}

export async function getAllJobs(urlRepo: string[]) {
  const repoSaves: IJobsResponse[] = [];

  const repos = await getRepos(urlRepo);

  repos.forEach(repo => {
    const labels = repo.labels?.map(label => {
      const obj: ILabels = {
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
