const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile } = require('./fileManager');
const {
  isValidEmail,
  isValidPassword,
} = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkers = await readContentFile();
  response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (request, response) => {
  const talkers = await readContentFile();
  const { id } = request.params;
  const found = talkers.find((talker) => talker.id === Number(id));
  if (found) return response.status(HTTP_OK_STATUS).json(found);
  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', isValidEmail, isValidPassword, (request, response) => {
  const { email, password } = request.body;
  console.log(email);
  console.log(password);
  const rdStr = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  response.status(HTTP_OK_STATUS).json({ token: rdStr });
});

app.listen(PORT, () => {
  console.log('Online');
});
