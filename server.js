import express from 'express';
import router from './routes/router.js';

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           SERVER                              //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
const PORT = process.env.PORT || 8080;
const app = express();

// Routes
app.use('/api/v1/posts', posts);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// deploying on vercel, and what needs to be written inside vercel.json: https://chatgpt.com/share/5c65c21a-27be-420a-955d-66babc660f58
// what is SQL Injection on the query parameter? how to prevent it? https://chatgpt.com/share/66e4bb91-7344-8000-8c0d-3f17bf1ee739
