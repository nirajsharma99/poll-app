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
app.post('/editpoll', (req, res) => {
  const x = req.body.question.question;
  const y = req.body.options;
  const k = req.body.key;
  console.log(x, y);

  savePoll
    .findOneAndUpdate({ _id: k }, { question: x, options: y })
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
app.post('/submitresponse', (req, res) => {
  console.log('api working', req.body.id, req.body.count, req.body.pollid);
  const pollid = req.body.pollid;
  savePoll
    .updateOne(
      { pollid: pollid, 'options.id': req.body.id },
      { $set: { 'options.$.count': req.body.count } }
    )
    .then(() => {
      console.log('Count updated');
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post('/deletepoll', (req, res) => {
  //console.log(req.body.key);
  savePoll
    .findOneAndRemove({ _id: req.body.key })
    .then(() => {
      console.log('Poll deleted');
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get('/getpoll/:id', (req, res) => {
  const x = req.params.id;
  console.log('response made' + x);
  savePoll
    .findOne({ pollid: x })
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
});

app.listen(port, () => console.log(`listening on port ${port}`));
