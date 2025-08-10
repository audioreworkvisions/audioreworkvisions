const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠ OPENAI_API_KEY nicht gesetzt – Chat/Image Endpoints werden deaktiviert.');
} else {
    console.log('✅ OpenAI API Key konfiguriert');
}
console.log('🚀 Server starting on port', PORT);

app.use(express.json());
app.use(express.static('.'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

if (process.env.OPENAI_API_KEY) {
    app.post('/api/chat', async (req, res) => {
        try {
            const { message, model = 'gpt-3.5-turbo', temperature = 0.7, max_tokens = 1000, conversation_history = [] } = req.body;
            if (!message) return res.status(400).json({ error: 'Message is required' });
            const messages = [
                { role: 'system', content: 'Du bist ein hilfreicher AI-Assistent. Antworte auf Deutsch.' },
                ...conversation_history.slice(-10),
                { role: 'user', content: message }
            ];
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
                body: JSON.stringify({ model, messages, temperature, max_tokens })
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('OpenAI API Error:', errorData);
                return res.status(response.status).json({ error: 'OpenAI API Error', details: errorData });
            }
            const data = await response.json();
            res.json({ response: data.choices[0].message.content });
        } catch (error) {
            console.error('Chat API Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

if (process.env.OPENAI_API_KEY) {
    app.post('/api/generate-image', async (req, res) => {
        try {
            const { prompt, size = '1024x1024' } = req.body;
            if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
                body: JSON.stringify({ prompt, n: 1, size })
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('OpenAI Image API Error:', errorData);
                return res.status(response.status).json({ error: 'OpenAI Image API Error', details: errorData });
            }
            const data = await response.json();
            res.json({ imageUrl: data.data[0].url });
        } catch (error) {
            console.error('Image Generation API Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

// Audio Range Streaming Route
app.get('/audio/:file', (req, res) => {
    const safe = req.params.file.replace(/[^a-zA-Z0-9._-]/g, '');
    const filePath = path.join(__dirname, 'public', 'audio', safe);
    fs.stat(filePath, (err, stat) => {
        if (err || !stat.isFile()) return res.status(404).end();
        const range = req.headers.range;
        const fileSize = stat.size;
        const contentType = safe.toLowerCase().endsWith('.mp3') ? 'audio/mpeg' : 'application/octet-stream';
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        if (!range) {
            res.writeHead(200, { 'Content-Length': fileSize, 'Content-Type': contentType });
            fs.createReadStream(filePath).pipe(res);
        } else {
            const m = /bytes=(\d*)-(\d*)/.exec(range);
            let start = m[1] ? parseInt(m[1], 10) : 0;
            let end = m[2] ? parseInt(m[2], 10) : (fileSize - 1);
            if (start >= fileSize) {
                res.status(416).setHeader('Content-Range', `bytes */${fileSize}`).end();
                return;
            }
            if (end >= fileSize) end = fileSize - 1;
            const chunkSize = end - start + 1;
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Content-Length': chunkSize,
                'Content-Type': contentType
            });
            fs.createReadStream(filePath, { start, end }).pipe(res);
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
});
