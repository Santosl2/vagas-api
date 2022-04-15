export interface ILabels {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface IJobsResponse {
  title: string;
  body: string;
  html_url: string;
  labels?: ILabels[];
}
