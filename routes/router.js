import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           FILE SYSTEM                         //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Reading the JSON file and parsing it
const postsFilePath = path.join(__dirname, '..', 'posts', 'posts.json');
let posts = [];

try {
  posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
} catch (error) {
  console.error('Error reading or parsing posts.json:', error);
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           ROUTES                              //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

// Create router instance
const router = express.Router();

// Method: Get all posts
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit, 10);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
});

// Method: Get a single post
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }

  res.status(200).json(post);
});

export default router;
