import { useState } from "react";
import http from "../api/http";
import { logger } from "../logging/logger";
import LogConsole from "../components/LogConsole";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [customCode, setCustomCode] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await http.post("/shorten", {
        url: longUrl,
        validity: validity || 30,
        shortcode: customCode || undefined,
      });
      setShortUrl(res.data.shortUrl);
      logger.add("UI", "Short URL created", res.data);
    } catch (e) {
      logger.add("ERROR", "Failed to shorten URL", e?.message || String(e));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>URL Shortener</h2>
      <input placeholder="Enter long URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
      <input placeholder="Validity (minutes)" type="number" value={validity} onChange={(e) => setValidity(Number(e.target.value))} />
      <input placeholder="Custom shortcode (optional)" value={customCode} onChange={(e) => setCustomCode(e.target.value)} />
      <button onClick={handleSubmit}>Shorten</button>

      {shortUrl && (
        <p>
          Shortened URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}

      <LogConsole />
    </div>
  );
}
