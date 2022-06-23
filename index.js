const express = require('express');
const bodyParser = require('body-parser');
const {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  isValidToken,
} = require('./middlewares/validations');

const {
  getTalkersController,
  getTalkersByQueryController,
  addTalkerController,
  getTalkerController,
  editTalkerController,
  deleteTalkerController,
  loginTalkerController,
} = require('./controllers/talkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkersController);

app.get('/talker/search', isValidToken, getTalkersByQueryController);

app.post(
  '/talker',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  addTalkerController,
);

app.get('/talker/:id', getTalkerController);

app.put(
  '/talker/:id',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  editTalkerController,
);

app.delete('/talker/:id', isValidToken, deleteTalkerController);

app.post('/login', isValidEmail, isValidPassword, loginTalkerController);

app.listen(PORT, () => {
  console.log('Online');
});
