// app/api/upload/route.js

import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export async function POST(request) {
  try {
    const body = await request.json();
    const { UserName, Password, TanNumber } = body;

    // Launch Puppeteer / Chromium
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
      // If needed, specify path to Chrome executable
      executablePath: process.env.CHROME_PATH || "/usr/bin/chromium-browser", 
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });

      await page.goto("https://www.tdscpc.gov.in/app/login.xhtml?usr=Ded");

      // Fill in the login form
      await page.type("#userId", UserName);
      await page.type("#psw", Password);
      await page.type("#tanpan", TanNumber);

      // Get captcha image screenshot
      const captchaElement = await page.$("#captchaImg");
      if (!captchaElement) {
        throw new Error("Captcha element not found");
      }
      const captchaBuffer = await captchaElement.screenshot();

      const base64Image = captchaBuffer.toString("base64");

      // Return JSON response
      return NextResponse.json(
        { captcha: `data:image/png;base64,${base64Image}` },
        { status: 200 }
      );
    } finally {
      await browser.close();
    }
  } catch (err) {
    return NextResponse.json(
      { error: err.toString() },
      { status: 500 }
    );
  }
}
