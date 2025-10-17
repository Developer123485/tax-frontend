
"use client";
import { useState } from "react";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [tanNumber, setTanNumber] = useState("");
  const [error, setError] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsRedirecting(true);

    try {
      const resp = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: userName,
          Password: password,
          TanNumber: tanNumber,
        }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || "Network error");
      }

      const data = await resp.json();
      
      // Check if we got a redirect URL
      if (data.redirectUrl) {
        // Open TRACES website in popup window (like authentication platform)
        const popup = window.open(
          data.redirectUrl, 
          'tracesAuth', 
          'width=1000,height=700,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no'
        );
        
        if (popup) {
          // Focus on the popup window
          popup.focus();
        } else {
          // Popup blocked, fallback to new tab
          window.open(data.redirectUrl, '_blank');
        }
        setIsRedirecting(false);
      } else {
        throw new Error("No redirect URL received");
      }
    } catch (err) {
      console.error("Error calling login API:", err);
      setError(err.message);
      setIsRedirecting(false);
    }
  };


  return (
    <div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="TAN Number"
          value={tanNumber}
          onChange={(e) => setTanNumber(e.target.value)}
        />
        <button type="submit" disabled={isRedirecting}>
          {isRedirecting ? "Redirecting..." : "Get CAPTCHA"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {isRedirecting && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>Redirecting to TRACES portal...</p>
          <div style={{ 
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 2s linear infinite",
            margin: "10px auto"
          }}></div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
