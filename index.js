const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile } = require('./fileManager');

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

app.listen(PORT, () => {
  console.log('Online');
});
