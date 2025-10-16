
"use client";
import { useState } from "react";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [tanNumber, setTanNumber] = useState("");
  const [captchaImage, setCaptchaImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

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
      // data should contain { captcha: "data:image/png;base64,..." }
      setCaptchaImage(data.captcha);
    } catch (err) {
      console.error("Error calling login API:", err);
      setError(err.message);
    }
  };

  return (
    <div>
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
        <button type="submit">Get CAPTCHA</button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {captchaImage && (
        <div>
          <img src={captchaImage} alt="CAPTCHA" />
        </div>
      )}
    </div>
  );
}

export default LoginForm;
