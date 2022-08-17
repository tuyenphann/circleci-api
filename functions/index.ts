// import * as functions from 'firebase-functions';
import express from 'express';

const app = express();
app.get('/', (req, res) => res.status(200).send('Hello World!!!'));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});
