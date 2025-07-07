import express from "express";
import jwt from "jsonwebtoken";
import { initiateOAuth, handleRedirect, getOAuthClient } from "./oauth";
import { fetchAnalyticsData } from "./youtube";

const app = express();
const PORT = process.env.PORT || 8081;
const JWT_SECRET = "your-jwt-secret"; // ganti dengan secret yang kuat

app.use(express.json());

// Endpoint untuk memulai OAuth
app.get("/auth", initiateOAuth);

// Endpoint callback OAuth, langsung return accessToken ke client
app.get("/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.status(400).send("No code provided");

  try {
    const oauth2Client = getOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    const accessToken = tokens.access_token;
    if (!accessToken) return res.status(400).send("No access token");

    // Langsung kirim accessToken ke client
    res.json({ accessToken });
  } catch (err) {
    res.status(500).send("Authentication failed");
  }
});

// Endpoint analytics, akses dengan accessToken di header Authorization: Bearer <accessToken>
app.get("/analytics", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("No access token provided");

  const accessToken = authHeader.split(" ")[1];
  try {
    const analyticsData = await fetchAnalyticsData(accessToken);
    res.json(analyticsData);
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid or expired access token");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
