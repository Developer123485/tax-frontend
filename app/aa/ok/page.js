// EFileButton.jsx
"use client";
import React from "react";

export default function LoginFormaa() {
  const handleStartEFiling = async () => {
    // const res = await fetch("/api/upload", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     UserName: "PTLA13241E1",
    //     Password: "bansal@123",
    //     TanNumber: "PTLJ10787A"
    //   }),
    // });

    // const data = await res.json();
    // console.log("Captcha:", data.captcha);

    const payload = {
      Tan: "PTLJ10787A",              // user TAN
      Password: "bansal@123", // password
      FinancialYear: "2024-25",
      Quarter: "Q2",                  // Q1 / Q2 / Q3 / Q4
      CategoryId: 4,                  // 1=24Q, 2=26Q, 4=27Q, 3=27EQ
      DeductorName: "ABC Pvt Ltd"
    };

    // Send the message to the Chrome extension content script
    window.postMessage(
      {
        type: "TV_START_EFILING",
        payload,
      },
      window.location.origin
    );
    console.log('📤 TV_START_EFILING sent to extension:', payload);
  };

  // optional listener for confirmation
  React.useEffect(() => {
    const listener = (event) => {
      if (event.data?.type === "TV_EFILING_TAB_OPENED") {
        console.log("✅ E-portal tab opened:", event.data.result);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return (
    <button
      onClick={handleStartEFiling}
      style={{
        background: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "10px 18px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      Start E-Filing
    </button>
  );
}
