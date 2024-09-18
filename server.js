import express from 'express';
import router from './routes/router.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve home.html statically
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Use your router for the posts API
app.use('/api/v1/posts', router);

// Export the app (necessary for Vercel)
export default app;

// Include app.listen for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// deploying on vercel, and what needs to be written inside vercel.json: https://chatgpt.com/share/5c65c21a-27be-420a-955d-66babc660f58
// what is SQL Injection on the query parameter? how to prevent it? https://chatgpt.com/share/66e4bb91-7344-8000-8c0d-3f17bf1ee739
