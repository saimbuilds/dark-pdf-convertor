# DarkPDF - Real-Time Analytics Setup

## Quick Start

### 1. Install Dependencies
```bash
# Install Node.js and npm (if not already installed)
sudo apt install npm -y

# Install project dependencies
npm install
```

### 2. Start the Server
```bash
# Start the analytics server
npm start
```

The server will run on `http://localhost:3000` and serve both the API and the website.

### 3. Access the Website
Open your browser and navigate to:
```
http://localhost:3000
```

## Features

✅ **Real-Time Synchronization**
- Visitor count updates across all devices instantly
- LinkedIn likes sync in real-time (every 3 seconds)
- Initial values: 40,000 visitors, 1,020 likes

✅ **Cross-Device Support**
- Open on phone and computer simultaneously
- Both devices show the same, live counts
- Like on one device, see it update on the other

✅ **API Fallback**
- Gracefully handles server downtime
- Falls back to localStorage if API unavailable

## API Endpoints

- `GET /api/stats` - Get current visitor and like counts
- `POST /api/stats/visit` - Increment visitor count
- `POST /api/stats/like` - Toggle like (body: `{ "action": "like" | "unlike" }`)
- `GET /api/health` - Health check

## Deployment Note

The `analytics-data.json` file is gitignored to keep initial count configuration private. Make sure to:
1. Keep `analytics-data.json` on your server
2. Back it up regularly
3. Never commit it to GitHub

## Troubleshooting

**Q: Counts not updating?**
- Check if server is running (`npm start`)
- Verify browser console for API errors
- Ensure `analytics-data.json` exists

**Q: Different counts on different devices?**
- Confirm both devices connect to the same server
- Check network connectivity
- Wait 3 seconds for polling to sync

**Q: Want to reset counts?**
- Edit `analytics-data.json` manually
- Restart the server
