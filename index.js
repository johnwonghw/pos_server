import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _config from './config'

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

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const password_digest = bcrypt.hashSync(password, 10);

  User.query({
    where: { email },
  }).fetch()
  .then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        const token = jwt.sign({
          id: user.get('id'),
        }, 'tempPassword')
        res.send({ token })
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' }})
    }
  })
})

app.listen(4200, () => {
  console.log('Running on localhost:4200')
})