/* eslint-disable import/prefer-default-export */
import { setup } from "axios-cache-adapter";

// export const api = axios.create({
//
// });

export const api = setup({
  baseURL: "https://api.github.com/repos/",
  cache: {
    maxAge: 2 * 60 * 1000,
  },
});
