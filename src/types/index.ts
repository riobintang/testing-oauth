export interface OAuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token?: string;
}

export interface YouTubeAnalyticsData {
    views: number;
    likes: number;
    comments: number;
}

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    analytics: YouTubeAnalyticsData;
}