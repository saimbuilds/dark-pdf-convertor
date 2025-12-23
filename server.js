const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'analytics-data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files

// Helper function to read data
function readData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        // Default values if file doesn't exist
        return { visitors: 40000, likes: 1020 };
    }
}

// Helper function to write data
function writeData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
}

// Get current stats
app.get('/api/stats', (req, res) => {
    const data = readData();
    res.json(data);
});

// Record a visit (increment visitor count)
app.post('/api/stats/visit', (req, res) => {
    const data = readData();
    data.visitors += 1;

    if (writeData(data)) {
        res.json({ success: true, visitors: data.visitors });
    } else {
        res.status(500).json({ success: false, error: 'Failed to update data' });
    }
});

// Toggle like (increment or decrement)
app.post('/api/stats/like', (req, res) => {
    const data = readData();
    const { action } = req.body; // 'like' or 'unlike'

    if (action === 'like') {
        data.likes += 1;
    } else if (action === 'unlike') {
        data.likes = Math.max(0, data.likes - 1); // Don't go below 0
    }

    if (writeData(data)) {
        res.json({ success: true, likes: data.likes });
    } else {
        res.status(500).json({ success: false, error: 'Failed to update data' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Analytics server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   GET  /api/stats        - Get current statistics`);
    console.log(`   POST /api/stats/visit  - Record a visit`);
    console.log(`   POST /api/stats/like   - Toggle like`);

    // Initialize data file if it doesn't exist
    const data = readData();
    writeData(data);
    console.log(`\n📈 Current stats: ${data.visitors} visitors, ${data.likes} likes`);
});
