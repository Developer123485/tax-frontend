// app/api/verification/callback/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { success, error, token, userId, verificationData } = body;

    // Log the verification result
    console.log("Verification callback received:", {
      success,
      error,
      userId,
      timestamp: new Date().toISOString()
    });

    if (success) {
      // Store verification result in your database
      // You can add your database logic here
      
      return NextResponse.json(
        { 
          message: "Verification successful",
          status: "success"
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          message: "Verification failed",
          error: error || "Unknown error",
          status: "error"
        },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Verification callback error:", err);
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: err.toString()
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const success = searchParams.get("success");
    const error = searchParams.get("error");
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    // Log the verification result
    console.log("Verification callback (GET) received:", {
      success,
      error,
      userId,
      timestamp: new Date().toISOString()
    });

    // Redirect to the frontend callback page with the parameters
    const frontendCallbackUrl = new URL("/verification/callback", request.url);
    if (success) frontendCallbackUrl.searchParams.set("success", success);
    if (error) frontendCallbackUrl.searchParams.set("error", error);
    if (token) frontendCallbackUrl.searchParams.set("token", token);
    if (userId) frontendCallbackUrl.searchParams.set("userId", userId);

    return NextResponse.redirect(frontendCallbackUrl);
  } catch (err) {
    console.error("Verification callback (GET) error:", err);
    return NextResponse.redirect(new URL("/verification/callback?error=server_error", request.url));
  }
}
