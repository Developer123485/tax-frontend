// // app/api/upload/route.js

// import { NextResponse } from "next/server";
// import puppeteer from "puppeteer-core";

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { UserName, Password, TanNumber } = body;

//     // Launch Puppeteer / Chrome
//     const browser = await puppeteer.launch({
//       headless: false,
//       args: ["--no-sandbox"],
//       executablePath:
//         process.env.CHROME_PATH ||
//         "C:/Program Files/Google/Chrome/Application/chrome.exe",
//     });

//     const page = await browser.newPage();
//     await page.setViewport({ width: 1920, height: 1080 });

//     await page.goto("https://www.tdscpc.gov.in/app/login.xhtml?usr=Ded");

//     // Fill login form
//     await page.type("#userId", UserName);
//     await page.type("#psw", Password);
//     await page.type("#tanpan", TanNumber);

//     // Capture captcha image
//     const captchaElement = await page.$("#captchaImg");
//     if (!captchaElement) {
//       throw new Error("Captcha element not found");
//     }

//     const captchaBuffer = await captchaElement.screenshot();
//     const base64Image = captchaBuffer.toString("base64");

//     // Schedule Chrome to close after 1 minute
//     setTimeout(async () => {
//       try {
//         await browser.close();
//         console.log("🕐 Chrome window closed automatically after 1 minute.");
//       } catch (err) {
//         console.error("Error closing browser:", err);
//       }
//     }, 60 * 1000); // 60 seconds

//     // Send the captcha response immediately
//     return NextResponse.json(
//       { captcha: `data:image/png;base64,${base64Image}` },
//       { status: 200 }
//     );
//   } catch (err) {
//     return NextResponse.json({ error: err.toString() }, { status: 500 });
//   }
// }

// app/api/upload/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { UserName, Password, TanNumber } = body;

    // Validate required fields
    if (!UserName || !Password || !TanNumber) {
      return NextResponse.json(
        { error: "UserName, Password, and TanNumber are required" },
        { status: 400 }
      );
    }

    // For now, let's try the simplest approach - just redirect to the basic TRACES login
    // We'll store the credentials in localStorage on the frontend for the user to use
    const redirectUrl = "https://www.tdscpc.gov.in/app/login.xhtml?usr=Ded";
    
    // Store user credentials to be used by the user when they manually fill the form
    const userCredentials = {
      UserName,
      Password,
      TanNumber,
      timestamp: Date.now()
    };

    // Return the redirect URL and credentials for the frontend to handle
    return NextResponse.json(
      { 
        redirectUrl: redirectUrl,
        credentials: userCredentials,
        message: "Redirect to third-party verification"
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}

