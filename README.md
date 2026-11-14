# LogicLens – Critical Thinking Explorer

Offline React Native (Expo) app that teaches logical reasoning, cognitive biases, logical fallacies and decision making through lessons and quizzes.

## Features
- 6 screens: Home, Explore, Learn, Challenge, Results, Bookmarks
- Search and category filter
- Topic details with examples
- Quiz with instant feedback and scoring
- Bookmarks and learning progress
- 100% offline (no APIs)

## Tech
React Native, Expo, React Navigation, expo-sqlite, JavaScript

## Data
Bundled JSON (`src/data`) is seeded into a local SQLite database on first launch (`src/database/db.js`).

## Run
npm install
npx expo start