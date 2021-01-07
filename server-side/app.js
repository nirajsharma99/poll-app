const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

const savePoll = require('./models/savePoll');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-type,Accept'
  );
  next();
});
app.get('/', (req, res) => res.send('hello world!'));
app.post('/api', (req, res) => {
  const x = req.body.question.question;
  const y = req.body.options;
  console.log(x, y);
  var data = new savePoll({
    question: req.body.question.question,
    pollid: req.body.question.id,
    options: req.body.options,
  });
  data
    .save()
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
});
app.post('/links', (req, res) => {
  const x = req.body.id;
  //console.log(x);
  savePoll
    .findOne({ pollid: x })
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
});

app.listen(port, () => console.log(`listening on port ${port}`));
