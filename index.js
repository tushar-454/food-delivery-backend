const express = require('express');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./src/routes/v1');
const globalError = require('./src/utils/globalError');

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.use(globalError);

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Server health is fine' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
