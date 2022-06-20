/* eslint-disable import/prefer-default-export */
import chrome from "chrome-aws-lambda";

import { IOptions } from "@/interface/IOptions";

const chromeExecPaths = {
  win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  linux: "/usr/bin/google-chrome",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  aix: null,
  android: null,
  freebsd: null,
  haiku: null,
  openbsd: null,
  netbsd: null,
  sunos: null,
  cygwin: null,
};

const exePath = chromeExecPaths[process.platform] ?? "";

export async function getOptions(development: boolean): Promise<IOptions> {
  let options: IOptions;

  if (development) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }

  return options;
}
