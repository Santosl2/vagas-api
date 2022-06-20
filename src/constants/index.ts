/* eslint-disable import/prefer-default-export */
import { Request } from "express";

export const CACHE_KEY = (req: Request) =>
  `_jobsFind_ ${req.originalUrl || req.url}`;
