const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Server health is fine' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
