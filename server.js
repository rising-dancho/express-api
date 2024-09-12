import express from 'express';
import path from 'path';
import url from 'url';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

// reading json using fs
const posts = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'posts', 'posts.json'), 'utf-8')
); // readFileSync returns a string that needs to be parse into an object

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           SERVER                              //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

const app = express();

app.get(`/`, (req, res) => {
  res.send('Welcome!');
});

app.get(`/api/v1/posts`, (req, res) => {
  res.json(posts); // parses the object into json
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// deploying on vercel, and what needs to be written inside vercel.json: https://chatgpt.com/share/5c65c21a-27be-420a-955d-66babc660f58
