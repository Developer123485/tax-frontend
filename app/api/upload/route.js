import { NextResponse } from "next/server";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import fs from "fs";

export async function POST(req) {
  let driver;

  try {
    const body = await req.json();
    const { userName, password, tanNumber } = body;

    // Chrome options
    const options = new chrome.Options();
    options.addArguments(
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--window-size=1920,1080"
    );

    options.setChromeBinaryPath("/usr/bin/chromium-browser");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver.get("https://nriservices.tdscpc.gov.in/nriapp/login.xhtml");

    await driver.findElement(By.id("userId")).sendKeys(userName);
    await driver.findElement(By.id("psw")).sendKeys(password);
    await driver.findElement(By.id("tanpan")).sendKeys(tanNumber);

    // Wait for captcha
    await driver.sleep(3000);

    const captchaImg = await driver.findElement(By.id("captchaImg"));
    const src = await captchaImg.getAttribute("src");

    let base64Image;

    if (src.startsWith("data:image")) {
      base64Image = src.split(",")[1];
    } else {
      // Screenshot fallback
      const screenshot = await captchaImg.takeScreenshot(true);
      base64Image = screenshot;
    }

    return NextResponse.json({
      captcha: `data:image/png;base64,${base64Image}`,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}
