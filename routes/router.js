import express from 'express';
import { posts } from '../server';

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           ROUTES                              //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

const router = express.Router();

// method: get all posts
router.get(`/`, (req, res) => {
  // console.log(req.query); // for getting the query parameter. eg, /api/v1/posts?limit=2&sort=desc
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts); // parses the object into json
});

// method: get a single post
router.get(`/:id`, (req, res) => {
  // console.log(req.params);
  const id = parseInt(req.params.id);
  // res.status(200).json(posts.filter((post) => post.id === id)); // show the post with the id that matches the id provided in params
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }

  res.status(200).json(post);
});

export default router;
