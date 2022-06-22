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
  getAllTalkers,
  getTalker,
  addTalker,
  editTalker,
  deleteTalker,
  getTalkersByQuery,
} = require('./models/talkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_OK_STATUS_201 = 201;
const HTTP_OK_STATUS_204 = 204;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkers = await getAllTalkers();
  return response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/search', isValidToken, async (request, response) => {
  const { q } = request.query;
  const result = await getTalkersByQuery(q);
  if (!q) {
    const talkers = await getAllTalkers();
    return response.status(HTTP_OK_STATUS).json(talkers);
  }

  if (!result) return response.status(HTTP_OK_STATUS).json([]);

  return response.status(HTTP_OK_STATUS).json(result);

});

app.post(
  '/talker',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  async (request, response) => {
    const talker = request.body;
    const addedTalker = await addTalker(talker);
    return response.status(HTTP_OK_STATUS_201).json(addedTalker);
  },
);

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const found = await getTalker(id);
  if (found) return response.status(HTTP_OK_STATUS).json(found);
  return response
    .status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' });
});

app.put(
  '/talker/:id',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  async (request, response) => {
    const { id } = request.params;
    const talker = request.body;
    const editedTalker = await editTalker(id, talker);
    return response.status(HTTP_OK_STATUS).json(editedTalker);
  },
);

app.delete('/talker/:id', isValidToken, async (request, response) => {
  const { id } = request.params;
  const editedTalker = await deleteTalker(id);
  return response.status(HTTP_OK_STATUS_204).json(editedTalker);
});

app.post('/login', isValidEmail, isValidPassword, (request, response) => {
  const { email, password } = request.body;
  console.log(email);
  console.log(password);
  const rdStr = Math.random().toString(36).substring(2, 10)
    + Math.random().toString(36).substring(2, 10);
  response.status(HTTP_OK_STATUS).json({ token: rdStr });
});

app.listen(PORT, () => {
  console.log('Online');
});
