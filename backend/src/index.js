require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { appRouter } = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { env } = require('./config/env');

const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: env.nodeEnv });
});

app.use('/api', appRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

app.use(errorHandler);

const port = env.port;
app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
}); 