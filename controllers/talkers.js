const HTTP_OK_STATUS_200 = 200;
const HTTP_OK_STATUS_201 = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_OK_STATUS_204 = 204;
const {
  getAllTalkers,
  getTalker,
  addTalker,
  editTalker,
  deleteTalker,
  getTalkersByQuery,
} = require('../models/talkers');

const getTalkersController = async (_request, response) => {
  const talkers = await getAllTalkers();
  console.log('controller:', talkers);
  return response.status(HTTP_OK_STATUS_200).json(talkers);
};

const getTalkersByQueryController = async (request, response) => {
  const { q } = request.query;
  const result = await getTalkersByQuery(q);
  if (!q) {
    const talkers = await getAllTalkers();
    return response.status(HTTP_OK_STATUS_200).json(talkers);
  }

  if (!result) return response.status(HTTP_OK_STATUS_200).json([]);

  return response.status(HTTP_OK_STATUS_200).json(result);
};

const getTalkerController = async (request, response) => {
  const { id } = request.params;
  const found = await getTalker(id);
  if (found) return response.status(HTTP_OK_STATUS_200).json(found);
  return response
    .status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' });
};

const addTalkerController = async (request, response) => {
  const talker = request.body;
  const addedTalker = await addTalker(talker);
  return response.status(HTTP_OK_STATUS_201).json(addedTalker);
};

const editTalkerController = async (request, response) => {
  const { id } = request.params;
  const talker = request.body;
  const editedTalker = await editTalker(id, talker);
  return response.status(HTTP_OK_STATUS_200).json(editedTalker);
};

const deleteTalkerController = async (request, response) => {
  const { id } = request.params;
  const editedTalker = await deleteTalker(id);
  return response.status(HTTP_OK_STATUS_204).json(editedTalker);
};

const loginTalkerController = async (request, response) => {
  const { email, password } = request.body;
  console.log(email);
  console.log(password);
  const rdStr = Math.random().toString(36).substring(2, 10)
    + Math.random().toString(36).substring(2, 10);
  response.status(HTTP_OK_STATUS_200).json({ token: rdStr });
};

module.exports = {
  getTalkersController,
  getTalkersByQueryController,
  addTalkerController,
  getTalkerController,
  editTalkerController,
  deleteTalkerController,
  loginTalkerController,
};
