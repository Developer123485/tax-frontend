import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const generatedResumeID = searchParams.get("generated_resume_id");

    if (!generatedResumeID) {
      return NextResponse.json(
        { error: "Invalid request: missing generated_resume_id" },
        { status: 400 }
      );
    }

    const finalHTML = `<html>
        <body style="font-family: Arial; padding: 40px;">
          <h1>Visible Chrome Demo</h1>
          <p>Resume ID: <b>${generatedResumeID}</b></p>
          <p>This Chrome window will stay open until you close it manually.</p>
        </body>
      </html>`;
    const resumeTitle = `resume_${generatedResumeID}`;

    let browser;

    if (
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production"
    ) {
      // Vercel/serverless only supports headless (no window)
      const executablePath = await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"
      );

      browser = await puppeteerCore.launch({
        executablePath,
        args: chromium.args,
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
      });
    } else {
      // ✅ LOCAL DEV: visible Chrome window that stays open
      browser = await puppeteer.launch({
        headless: false, // 👈 show real Chrome window
        defaultViewport: null, // full screen
        args: [
          "--start-maximized",
          "--no-sandbox",
          "--disable-setuid-sandbox",
        ],
      });
    }

    const page = await browser.newPage();
    await page.setContent(finalHTML, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10px", right: "10px", bottom: "10px", left: "10px" },
    });

    // ❌ DO NOT close the browser automatically
    // await browser.close();

    console.log("✅ Chrome is open. Close it manually when done.");

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${resumeTitle}.pdf`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { message: "Error generating PDF", error: error.message },
      { status: 500 }
    );
  }
}
