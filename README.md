# Discord Wrapped

A Spotify Wrapped-style visualization of your Discord data. Analyze your messaging patterns, favorite words, emojis, and communication style - all processed locally in your browser.

## Features

- **Message Statistics**: Total messages, daily averages, year-over-year comparisons
- **Activity Patterns**: Peak hours, busiest days, messaging streaks
- **Linguistic Analysis**: Favorite words, common phrases, catchphrases
- **Communication Style**: Personality traits based on your writing patterns
- **Privacy-First**: All data processing happens client-side - nothing is uploaded

## Live Demo

Visit: https://o234-a11y.github.io/discord-wrapped/

## Getting Your Discord Data

1. Open Discord and go to **Settings**
2. Navigate to **Privacy & Safety**
3. Scroll down and click **Request all of my Data**
4. Wait for the email from Discord (can take up to 30 days)
5. Download and extract the ZIP file
6. Upload the `package` folder to this app

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. Push this code to a GitHub repository named `discord-wrapped`
2. Go to your repo's **Settings** > **Pages**
3. Under "Build and deployment", select **GitHub Actions**
4. Push to `main` branch - it will auto-deploy!

### Option 2: Manual Deployment

```bash
# Install gh-pages if not already installed
npm install -D gh-pages

# Build and deploy
npm run deploy
```

## Customization

To change the repository name, update these files:

1. `vite.config.js` - Change the `base` path
2. `package.json` - Update the `homepage` URL

## Tech Stack

- React 18
- Vite
- CSS Animations
- Client-side data processing

## Privacy

Your Discord data never leaves your device. All analysis is performed locally in your browser using JavaScript. No data is sent to any server.

## License

MIT
