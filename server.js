import express from 'express';
import path from 'path';
import url from 'url';
import { fileURLToPath } from 'url';

// Your function logic here
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const baseURL = 'api/v1';
const app = express();

app.get(`${baseURL}/posts`, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// deploying on vercel, and what needs to be written inside vercel.json: https://chatgpt.com/share/5c65c21a-27be-420a-955d-66babc660f58
