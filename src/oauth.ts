import { Request, Response } from "express";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

// Extend SessionData to include accessToken
declare module "express-session" {
  interface SessionData {
    accessToken?: string;
  }
}

// Ganti path ke client_secret.json Anda
const CLIENT_SECRET_PATH = path.join(__dirname, "../client_secret.json");
const clientSecret = JSON.parse(fs.readFileSync(CLIENT_SECRET_PATH, "utf8"));

const { client_id, client_secret, redirect_uris } = clientSecret.web;
const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const SCOPES = [
  "https://www.googleapis.com/auth/yt-analytics.readonly",
  "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtubepartner"
];

export function initiateOAuth(req: Request, res: Response) {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
  res.redirect(url);
}

export async function handleRedirect(req: Request, res: Response) {
  const code = req.query.code as string;
  if (!code) return res.status(400).send("No code provided");

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log(tokens);
    req.session.accessToken = tokens.access_token ?? undefined;
    res.redirect("/analytics");
  } catch (err) {
    res.status(500).send("Authentication failed");
  }
}

export function getOAuthClient() {
  return oauth2Client;
}
