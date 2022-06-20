/* eslint-disable import/prefer-default-export */
import mcached from "memory-cache";

export function getCache(key: string) {
  const cachedBody = mcached.get(key);
  return cachedBody;
}

export function saveOnCache(duration: number, key: string, body: any) {
  mcached.put(key, body, duration * 1000);
}
