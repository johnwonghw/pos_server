import express from 'express';
import bodyParser from 'body-parser';

import bcrypt from 'bcrypt';
import User from './models/user';

let app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('hello dddfood')
})

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const password_digest = bcrypt.hashSync(password, 10);

  User.forge({
    email, password_digest
  }, { hasTimestamps: true }).save()
  .then(user => res.json({ success: true}))
  .catch(err => res.status(500).json({ error: err }))

})

app.listen(4200, () => {
  console.log('Running on localhost:4200')
})