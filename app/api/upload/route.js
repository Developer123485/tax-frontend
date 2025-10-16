// app/api/upload/route.js (or whatever route you use)

import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export async function POST(request) {
  try {
    const { UserName, Password, TanNumber } = await request.json();

    // Path on Linux server (adjust based on your installation)
    const linuxChromePath = "/usr/bin/chromium-browser";  // or "/usr/bin/google-chrome"

    // Optionally check if file exists
    const fs = require("fs");
    if (!fs.existsSync(linuxChromePath)) {
      throw new Error(`Chromium not found at path: ${linuxChromePath}`);
    }

    const browser = await puppeteer.launch({
      executablePath: linuxChromePath,
      headless: false, // set false if you want visible UI (if GUI available)
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--window-size=1920,1080"
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://www.tdscpc.gov.in/app/login.xhtml?usr=Ded");

    await page.type("#userId", UserName);
    await page.type("#psw", Password);
    await page.type("#tanpan", TanNumber);

    const captchaEl = await page.$("#captchaImg");
    if (!captchaEl) {
      throw new Error("captchaImg element not found");
    }
    const buf = await captchaEl.screenshot();
    const base64 = buf.toString("base64");

    await browser.close();

    return NextResponse.json({ captcha: `data:image/png;base64,${base64}` });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
