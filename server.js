
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'access_count.json');

app.use(express.static('public'));

app.get('/access', (req, res) => {
    let count = 0;
    if (fs.existsSync(DATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        count = data.count || 0;
    }
    count += 1;
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count }));
    res.json({ count });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
