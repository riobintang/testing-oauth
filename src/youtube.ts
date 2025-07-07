import axios from "axios";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { YouTubeAnalyticsData } from "./types";

const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "YOUR_REDIRECT_URI";
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export async function getAnalyticsData(
  accessToken: string
): Promise<YouTubeAnalyticsData> {
  const url = "https://youtubeanalytics.googleapis.com/v2/reports";
  const params = {
    ids: "channel==YOUR_CHANNEL_ID",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    metrics: "views,likes,comments",
    dimensions: "day",
    access_token: accessToken,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch analytics data: ${error}`);
  }
}

export async function authenticateUser(
  code: string
): Promise<string | null | undefined> {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens.access_token;
}

export async function fetchAnalyticsData(accessToken: string) {
  const youtubeAnalytics = google.youtubeAnalytics("v2");
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({}); // reset credentials

  oauth2Client.setCredentials({ access_token: accessToken });

  // Ganti channelId sesuai kebutuhan, atau ambil dari token jika tersedia
  const channelId = "MINE";

  const response = await youtubeAnalytics.reports.query({
    auth: oauth2Client,
    ids: `channel==${channelId}`,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    metrics: "estimatedRevenue",
    dimensions: "day",
    currency: "USD",
  });

  return response.data;
}
