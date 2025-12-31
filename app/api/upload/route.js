import { NextResponse } from "next/server";
import puppeteer from "puppeteer"; // full puppeteer

export async function POST(request) {
  let browser;

  try {
    const body = await request.json();
    const { UserName, Password, TanNumber } = body;

    if (!UserName || !Password || !TanNumber) {
      return NextResponse.json(
        { error: "UserName, Password, and TanNumber are required" },
        { status: 400 }
      );
    }

    // 🚀 Launch browser
    browser = await puppeteer.launch({
      headless: true, // ❗ TRACES blocks headless
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage",
        "--disable-infobars",
        "--window-size=1400,900",
      ],
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 900 });

    // Real user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Headers
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      "Upgrade-Insecure-Requests": "1",
    });

    // Open login page
    await page.goto(
      "https://www.tdscpc.gov.in/app/login.xhtml?usr=Ded",
      { waitUntil: "networkidle2" }
    );

    // Fill fields with proper waits
    await page.waitForSelector("#userId", { timeout: 10000 });
    await page.type("#userId", UserName, { delay: 50 });

    await page.waitForSelector("#psw", { timeout: 10000 });
    await page.type("#psw", Password, { delay: 50 });

    await page.waitForSelector("#tanpan", { timeout: 10000 });
    await page.type("#tanpan", TanNumber, { delay: 50 });

    // Small delay for captcha render
    await new Promise((r) => setTimeout(r, 2000));

    // 🔐 CAPTCHA handling
    await page.waitForSelector("#captchaImg", { timeout: 10000 });
    const captchaElement = await page.$("#captchaImg");

    const captchaBase64 = await captchaElement.screenshot({
      encoding: "base64",
    });

    return NextResponse.json({
      success: true,
      message:
        "Fields filled successfully. Please show captcha to user and submit manually.",
      captcha: `data:image/png;base64,${captchaBase64}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || err.toString() },
      { status: 500 }
    );
  }
}
