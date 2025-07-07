# YouTube Analytics Report

This project is a simple application that allows users to fetch and display analytics data from their YouTube channels using OAuth authentication. It utilizes the YouTube Data API to retrieve information such as views, likes, and comments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [OAuth Authentication](#oauth-authentication)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/youtube-analytic-report.git
   ```

2. Navigate to the project directory:
   ```
   cd youtube-analytic-report
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your OAuth credentials:
   - Obtain your client secret and client ID from the Google Developer Console.
   - Create a `.env` file in the root directory and add your credentials:
     ```
     CLIENT_ID=your_client_id
     CLIENT_SECRET=your_client_secret
     REDIRECT_URI=your_redirect_uri
     ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Follow the prompts to authenticate with your Google account and grant access to your YouTube data.

4. Once authenticated, you can view your YouTube analytics data.

## OAuth Authentication

This application uses OAuth 2.0 for authentication. The `oauth.ts` file manages the OAuth flow, including initiating the authentication process, handling redirects, and obtaining access tokens.

## Project Structure

```
youtube-analytic-report
├── src
│   ├── app.ts          # Entry point of the application
│   ├── oauth.ts        # OAuth authentication management
│   ├── youtube.ts      # YouTube API interaction
│   └── types
│       └── index.ts    # Type definitions
├── package.json        # npm configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.