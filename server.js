const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY environment variable is required');
    console.error('Please set OPENAI_API_KEY in your .env file or environment variables');
    process.exit(1);
}

console.log('✅ OpenAI API Key configured successfully');
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

app.post('/api/chat', async (req, res) => {
    try {
        const { message, model = 'gpt-3.5-turbo', temperature = 0.7, max_tokens = 1000, conversation_history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const messages = [
            { role: 'system', content: 'Du bist ein hilfreicher AI-Assistent. Antworte auf Deutsch, es sei denn, der Benutzer fragt explizit nach einer anderen Sprache.' },
            ...conversation_history.slice(-10), // Last 10 messages for context
            { role: 'user', content: message }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                temperature: temperature,
                max_tokens: max_tokens
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenAI API Error:', errorData);
            return res.status(response.status).json({ error: 'OpenAI API Error', details: errorData });
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        res.json({ response: aiResponse });
    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt, size = '1024x1024', quality = 'standard' } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1,
                size: size
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenAI Image API Error:', errorData);
            return res.status(response.status).json({ error: 'OpenAI Image API Error', details: errorData });
        }

        const data = await response.json();
        const imageUrl = data.data[0].url;

        res.json({ imageUrl: imageUrl });
    } catch (error) {
        console.error('Image Generation API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
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
