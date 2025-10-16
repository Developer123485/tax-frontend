
"use client";
"use client";
import { useState } from "react";

export default function PdfButton() {
  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async () => {
    try {
      setLoading(true);

      const generated_resume_id = "123"; // or from state/input

      // 🔥 Fetch the PDF from the API route
      const response = await fetch(
        `/api/upload?generated_resume_id=${generated_resume_id}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // 🧾 Convert response to blob (PDF)
      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);

      // 💾 Trigger browser download
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `resume_${generated_resume_id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Error generating PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGeneratePDF}
      disabled={loading}
      style={{
        padding: "10px 20px",
        background: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {loading ? "Generating..." : "Download PDF"}
    </button>
  );
}
