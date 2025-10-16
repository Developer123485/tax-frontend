import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Keep singleton browser instance
let browser = null;

export async function GET() {
  try {
    const CHROME_PATH = process.env.CHROME_PATH || "/usr/bin/google-chrome";
    const DISPLAY = process.env.DISPLAY || ":99";

    // Reuse browser if already running
    if (browser && (await browser.process())?.pid) {
      const page = await browser.newPage();
      await page.goto("https://example.org", { waitUntil: "domcontentloaded" });
      return NextResponse.json({ ok: true, reused: true });
    }

    // Launch new visible Chrome session
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: false, // Visible mode
      defaultViewport: null,
      args: [`--display=99`, '--no-sandbox']
    });

    const page = await browser.newPage();
    await page.goto("https://www.example.com", { waitUntil: "domcontentloaded" });

    return NextResponse.json({ ok: true, message: "Chrome opened visibly" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
