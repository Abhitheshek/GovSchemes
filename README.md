# Indian Government Schemes Explorer

This application provides information about various government schemes in India, both at the national and state levels. It uses Gemini AI to generate detailed information about each scheme.

## Features

- Browse schemes by category (Agriculture, Education, Health, etc.)
- View detailed information about each scheme
- National and state-level schemes
- AI-powered content generation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your Gemini API key:
   - Open `app/gemini.js`
   - Replace `YOUR_GEMINI_API_KEY` with your actual API key

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- Next.js
- React
- Chakra UI
- Google Generative AI (Gemini)

## Project Structure

- `/app` - Main application code
  - `/national` - National schemes pages
  - `/state` - State schemes pages
  - `gemini.js` - Gemini AI integration

## Note

This application uses Gemini AI to generate information about government schemes. The information provided should be verified from official government sources before making any decisions based on it.