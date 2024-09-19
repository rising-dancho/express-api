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
//                           GET REQUEST                         //
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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           POST REQUEST                        //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

// Method: Create new post
router.post('/', (req, res) => {
  console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ msg: 'Please include a title' });
  }

  posts.push(newPost);
  res.status(201).json(posts);
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           PUT REQUEST                         //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

// Method: Update a post
router.put('/:id', (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           DELETE REQUEST                      //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

const NOT_FOUND = -1; // used for clarifying that -1 means the result does not exist

// Method: Delete a post
router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  // find the index of the post to be removed
  const postIndex = posts.findIndex((post) => post.id === id);
  console.log(postIndex);

  // check if the index even exists before trying to delete
  if (!postIndex === NOT_FOUND) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }

  // Remove the post
  posts.splice(postIndex, 1);

  res.status(204).send(); // no will be sent because it is already deleted
});

export default router;

// purpose of using a constant NOT_FOUND: https://chatgpt.com/share/66eca1ff-0f30-8000-91e4-19e7bb165615
