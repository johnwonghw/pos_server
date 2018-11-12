import express from 'express';

let app = express();

app.get('/', (req, res) => {
  res.send('hello dood')
})

app.listen(4200, () => {
  console.log('Running on localhost:4200')
})