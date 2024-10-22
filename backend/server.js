const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/generate-text', async (req, res) => {
  const { userText } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: userText,
      max_tokens: 150,
    });

    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'Error generating text' });
  }
});

app.post('/api/generate-image', async (req, res) => {
  const { userText } = req.body;

  try {
    const response = await openai.createImage({
      prompt: userText,
      n: 1,
      size: '256x256',
    });

    res.json({ imageUrl: response.data.data[0].url });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Error generating image' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
