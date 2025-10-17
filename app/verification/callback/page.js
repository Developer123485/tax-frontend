"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../../components/header/header";

export default function VerificationCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Processing verification...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get parameters from the URL
        const success = searchParams.get("success");
        const error = searchParams.get("error");
        const token = searchParams.get("token");
        const userId = searchParams.get("userId");

        if (success === "true") {
          setStatus("success");
          setMessage("Verification completed successfully!");
          
          // Store verification result in localStorage or send to your backend
          if (token) {
            localStorage.setItem("verificationToken", token);
          }
          
          // Redirect to dashboard or next step after a delay
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else if (error) {
          setStatus("error");
          setMessage(`Verification failed: ${error}`);
        } else {
          setStatus("error");
          setMessage("Verification failed. Please try again.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("An error occurred during verification.");
        console.error("Verification callback error:", err);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "⏳";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">{getStatusIcon()}</div>
            <h1 className="text-2xl font-bold mb-4">Verification Status</h1>
            <p className={`text-lg ${getStatusColor()}`}>{message}</p>
            
            {status === "processing" && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            )}
            
            {status === "error" && (
              <div className="mt-6">
                <button
                  onClick={() => router.push("/verification")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
