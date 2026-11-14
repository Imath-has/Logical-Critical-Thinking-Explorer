import * as SQLite from 'expo-sqlite';
import { topics } from '../data/topics';
import { questions } from '../data/questions';

let db;
const parse = (r) => ({
  ...r,
  examples: r.examples ? JSON.parse(r.examples) : [],
  options: r.options ? JSON.parse(r.options) : undefined,
});

export async function initDB() {
  db = await SQLite.openDatabaseAsync('logiclens.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS topics(id INTEGER PRIMARY KEY, title TEXT, category TEXT, description TEXT, examples TEXT, reallife TEXT);
    CREATE TABLE IF NOT EXISTS questions(id INTEGER PRIMARY KEY, category TEXT, question TEXT, options TEXT, answer INTEGER, explanation TEXT);
    CREATE TABLE IF NOT EXISTS bookmarks(topic_id INTEGER PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS quiz_results(id INTEGER PRIMARY KEY AUTOINCREMENT, score INTEGER, total INTEGER, category TEXT, date TEXT);
    CREATE TABLE IF NOT EXISTS user_progress(topic_id INTEGER PRIMARY KEY, completed_at TEXT);
  `);
  // Seed bundled JSON into SQLite on first launch only
  const { c } = await db.getFirstAsync('SELECT COUNT(*) AS c FROM topics');
  if (c === 0) {
    for (const t of topics)
      await db.runAsync('INSERT INTO topics VALUES(?,?,?,?,?,?)', [t.id, t.title, t.category, t.description, JSON.stringify(t.examples), t.reallife]);
    for (const q of questions)
      await db.runAsync('INSERT INTO questions VALUES(?,?,?,?,?,?)', [q.id, q.category, q.question, JSON.stringify(q.options), q.answer, q.explanation]);
  }
}

// ---- Topics ----
export const getCategories = async () =>
  (await db.getAllAsync('SELECT DISTINCT category FROM topics ORDER BY category')).map((r) => r.category);

export const getTopics = async (search = '', category = 'All') =>
  (await db.getAllAsync(
    `SELECT * FROM topics WHERE (title LIKE ? OR description LIKE ?) AND (? = 'All' OR category = ?) ORDER BY title`,
    [`%${search}%`, `%${search}%`, category, category]
  )).map(parse);

export const getTopic = async (id) => parse(await db.getFirstAsync('SELECT * FROM topics WHERE id = ?', [id]));

// ---- Bookmarks ----
export const isBookmarked = async (id) => !!(await db.getFirstAsync('SELECT 1 FROM bookmarks WHERE topic_id = ?', [id]));

export async function toggleBookmark(id) {
  if (await isBookmarked(id)) await db.runAsync('DELETE FROM bookmarks WHERE topic_id = ?', [id]);
  else await db.runAsync('INSERT INTO bookmarks VALUES(?)', [id]);
}

export const getBookmarks = async (search = '') =>
  (await db.getAllAsync(
    `SELECT t.* FROM topics t JOIN bookmarks b ON b.topic_id = t.id WHERE t.title LIKE ? OR t.description LIKE ? ORDER BY t.title`,
    [`%${search}%`, `%${search}%`]
  )).map(parse);

// ---- Questions / Quiz ----
export const getQuestions = async (category = 'All', n = 5) =>
  (await db.getAllAsync(`SELECT * FROM questions WHERE (? = 'All' OR category = ?) ORDER BY RANDOM() LIMIT ?`, [category, category, n])).map(parse);

export async function getDailyQuestion() {
  const all = (await db.getAllAsync('SELECT * FROM questions ORDER BY id')).map(parse);
  return all[Math.floor(Date.now() / 86400000) % all.length];
}

export const saveResult = (score, total, category) =>
  db.runAsync('INSERT INTO quiz_results(score,total,category,date) VALUES(?,?,?,?)', [score, total, category, new Date().toLocaleString()]);

export const getResults = () => db.getAllAsync('SELECT * FROM quiz_results ORDER BY id DESC');

// ---- Progress ----
export const markLearned = (id) =>
  db.runAsync('INSERT OR REPLACE INTO user_progress VALUES(?,?)', [id, new Date().toISOString()]);

export const isLearned = async (id) => !!(await db.getFirstAsync('SELECT 1 FROM user_progress WHERE topic_id = ?', [id]));

export async function getProgress() {
  const l = await db.getFirstAsync('SELECT COUNT(*) AS c FROM user_progress');
  const t = await db.getFirstAsync('SELECT COUNT(*) AS c FROM topics');
  return { learned: l.c, total: t.c };
}
