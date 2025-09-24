require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Read file synchronously
const basicPrompt = fs.readFileSync('prompt.txt', 'utf8');
const databasePrompt = fs.readFileSync('database.json', 'utf8');
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

console.log(OPENROUTER_API_KEY);

async function callLLM(text) {
  if (typeof text != 'string') {
    throw new Error("Input must be a string")
  }
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        "model": "x-ai/grok-4-fast:free",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": text
              }
            ]
          }
        ]
      })
    });

    console.log(response);

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  callLLM
}

callLLM(basicPrompt + '/n' + databasePrompt);