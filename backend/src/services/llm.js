require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Read file synchronously
const basicPrompt = fs.readFileSync('prompt.txt', 'utf8');
// const databasePrompt = fs.readFileSync('database.json', 'utf8');
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

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
    const data = await response.json();
    // Extract the content string from the LLM response
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content === 'string') {
      try {
        // Parse the content string as JSON and return it
        console.log(content);
        return JSON.parse(content);
      } catch (parseError) {
        // If parsing fails, return the raw string
        return content;
      }
    }
    // If content is not found, return the whole data object
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = {
  callLLM
}

// callLLM(basicPrompt + '/n' + databasePrompt);