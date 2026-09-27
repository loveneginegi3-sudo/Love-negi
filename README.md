# Negi Love Singh AI

A simple mobile-friendly chat app with a secure backend proxy to the Gemini API.

## Features
- Modern dark UI inspired by the original design
- Message sending from the browser to a Node.js backend
- Gemini API key kept on the server instead of in the frontend
- Error handling for missing API key and failed requests

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Replace `your_gemini_api_key_here` with your actual Gemini API key.
4. Start the app:
   ```bash
   npm start
   ```
5. Open http://localhost:3000 in your browser.

## Project structure
- `index.html` — frontend UI
- `server.js` — Express API server and Gemini proxy
- `.env.example` — sample environment configuration

## Notes
- Do not expose your Gemini API key in browser-side JavaScript.
- This setup keeps the key on the backend server and only sends user messages to the server.
