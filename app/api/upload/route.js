import { NextResponse } from "next/server";
import puppeteer from "puppeteer"; // ✅ Full version (not puppeteer-core)

export async function POST(request) {
  try {
    const body = await request.json();
    const { UserName, Password, TanNumber } = body;

    if (!UserName || !Password || !TanNumber) {
      return NextResponse.json(
        { error: "UserName, Password, and TanNumber are required" },
        { status: 400 }
      );
    }

    // Puppeteer auto-installs its own Chromium
    const browser = await puppeteer.launch({
      headless: false, // IMPORTANT: TRACES blocks headless browsers
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage",
        "--disable-infobars",
        "--window-size=1400,900",
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    // Real user user-agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Required headers
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      "Upgrade-Insecure-Requests": "1"
    });

    await page.goto("https://www.tdscpc.gov.in/app/login.xhtml?usr=Ded", {
      waitUntil: "networkidle2",
    });

    // Add explicit waits for elements to be present before typing
    try {
      await page.waitForSelector("#userId", { timeout: 10000 });
      await page.type("#userId", UserName);
    } catch (err) {
      throw new Error(`userId element not found. Error: ${err.message}`);
    }

    try {
      await page.waitForSelector("#psw", { timeout: 10000 });
      await page.type("#psw", Password);
    } catch (err) {
      throw new Error(`psw element not found. Error: ${err.message}`);
    }

    try {
      await page.waitForSelector("#tanpan", { timeout: 10000 });
      await page.type("#tanpan", TanNumber);
    } catch (err) {
      throw new Error(`tanpan element not found. Error: ${err.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json({
      success: true,
      message:
        "Fields auto-filled successfully. Please enter captcha manually and click Login.",
    });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}