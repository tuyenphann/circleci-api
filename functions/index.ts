// import * as functions from 'firebase-functions';
import express from 'express';
import * as uuid from 'uuid';
import PostgresConnection from './shared-lib/helpers/postgres-connection';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('Hello World!'));

app.post('/create-user', async (req, res) => {
  const db = PostgresConnection.Knex();
  const now = new Date();
  const newUser = { userId: uuid.v4(), createdOn: now, updatedOn: now };
  try {
    await db.insert(newUser).into('Users');
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(500).send(false);
  }
});

app.delete('/delete-user', async (req, res) => {
  const db = PostgresConnection.Knex();
  try {
    await db.delete().from('Users').where('userId', req.body.userId);
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(500).send(false);
  }
});

app.get('/get-users', async (req, res) => {
  const db = PostgresConnection.Knex();
  try {
    const users = await db.select().from('Users');
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(false);
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});
