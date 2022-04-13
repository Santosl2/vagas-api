export interface Labels {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface JobsResponse {
  title: string;
  body: string;
  html_url: string;
  labels: Labels[];
}
