import express from 'express';
import path from 'path';
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

const home = fs.readFileSync(
  path.join(__dirname, 'public', 'home.html'),
  'utf-8'
);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           SERVER                              //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

const app = express();

// welcome page
app.get(`/`, (req, res) => {
  res.send(home);
});

// get all posts
app.get(`/api/v1/posts`, (req, res) => {
  res.json(posts); // parses the object into json
});

// get a single post
app.get(`/api/v1/posts/:id`, (req, res) => {
  // console.log(req.params);
  const id = parseInt(req.params.id);
  res.json(posts.filter((post) => post.id === id)); // show the post with the id that matches the id provided in params
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// deploying on vercel, and what needs to be written inside vercel.json: https://chatgpt.com/share/5c65c21a-27be-420a-955d-66babc660f58
