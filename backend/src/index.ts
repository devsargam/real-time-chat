import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
