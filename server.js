import express from 'express';
import router from './routes/router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const PORT = process.env.PORT || 8080;
const app = express();

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           FILE READ                           //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// reading json using fs
export const posts = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'posts', 'posts.json'), 'utf-8')
); // readFileSync returns a string that needs to be parse into an object

const home = fs.readFileSync(
  path.join(__dirname, 'public', 'home.html'),
  'utf-8'
);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           ROUTES                              //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
// welcome page
app.get(`/`, (req, res) => {
  res.send(home);
});

app.use('/api/v1/posts', router);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// deploying on vercel, and what needs to be written inside vercel.json: https://chatgpt.com/share/5c65c21a-27be-420a-955d-66babc660f58
// what is SQL Injection on the query parameter? how to prevent it? https://chatgpt.com/share/66e4bb91-7344-8000-8c0d-3f17bf1ee739
