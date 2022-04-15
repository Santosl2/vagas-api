export interface ILabels {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface IJobsResponse {
  id?: number;
  title: string;
  body: string;
  html_url: string;
  labels?: ILabels[];
  publishedTime?: string;
}
