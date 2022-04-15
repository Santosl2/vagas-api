import chrome from "chrome-aws-lambda";
import { IOptions } from "interface/IOptions";
import Puppeteer, { Browser, Page } from "puppeteer-core";

class PuppeteerCore {
  private page: Page | undefined;

  private browser: Browser | undefined;

  private options: IOptions;

  private chromeExecPaths = {
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

  constructor() {
    this.getOptions(true);
  }

  private async getOptions(development: boolean): Promise<IOptions> {
    let options: IOptions;
    const exePath = this.chromeExecPaths[process.platform] ?? "";

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

  private async getPage(): Promise<Page> {
    if (this.page) return this.page;

    const options = await this.getOptions(true);
    this.browser = await Puppeteer.launch(options);

    this.page = await this.browser.newPage();
    this.page.setViewport({ width: 1360, height: 720 });
    return this.page;
  }

  public async goToPage(url: string): Promise<Page> {
    const page = await this.getPage();

    await page.goto(url);

    return page;
  }

  public async closeBrowserAndPage() {
    await this.page?.close();
    await this.browser?.close();
    this.page = undefined;
    this.browser = undefined;
  }
}

export default PuppeteerCore;
