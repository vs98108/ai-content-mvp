import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let feedback = [];

app.get('/api/health', (req, res) => {
  res.json({ok: true});
});

app.post('/api/feedback', (req, res) => {
  const data = req.body;
  // Basic storage; in real application use DB
  feedback.push({
    text_hash: data.text_hash || '',
    length: data.text_length || 0,
    model_version: data.model_version || 'v0',
    score: data.score || 0,
    feedback: data.feedback || '',
    timestamp: new Date().toISOString()
  });
  res.json({status: 'received', count: feedback.length});
});

app.get('/api/feedback', (req, res) => {
  res.json({count: feedback.length, feedback});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Feedback server running on port ${port}`);
});
