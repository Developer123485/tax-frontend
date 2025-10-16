import { NextResponse } from "next/server";
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from "fs";

export async function POST(request) {
    const { UserName, Password, TanNumber } = await request.json();

    try {
        // Path to Chrome/Chromium
        // const chromePath = "/usr/bin/chromium-browser";

        // if (!fs.existsSync(chromePath)) {
        //     throw new Error(`Chromium not found at path: ${chromePath}`);
        // }

        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(), // important!
            headless: chromium.headless,
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
