const fs = require('fs/promises');

const PATH_FILE = './talker.json';
// actions
// get all
const getAllTalkers = async () => JSON.parse(await fs.readFile(PATH_FILE));

// get one
const getTalker = async (id) => {
  const talkers = await getAllTalkers();
  return talkers.find((talker) => talker.id === Number(id));
};
// get talker by query (name)
const getTalkersByQuery = async (query) => {
  const talkers = await getAllTalkers();
  return talkers.filter((talker) => talker.name.includes(query));
};

// add talker
const addTalker = async (talker) => {
  const talkers = await getAllTalkers();
  const id = talkers.length + 1;
  const addedTalker = { ...talker, id };
  const addedTalkers = [...talkers, addedTalker];
  await fs.writeFile(PATH_FILE, JSON.stringify(addedTalkers));
  return addedTalker;
};

// edit talker
const editTalker = async (id, { name, age, talk }) => {
  const talkers = await getAllTalkers();
  const index = talkers.findIndex((talker) => talker.id === Number(id));
  if (index) {
    talkers[index].name = name;
    talkers[index].age = age;
    talkers[index].talk = talk;
  }
  await fs.writeFile(PATH_FILE, JSON.stringify(talkers));
  return talkers[index];
};

// delete talker
const deleteTalker = async (id) => {
  const talkers = await getAllTalkers();
  const talkersAfterDelete = talkers.filter(
    (talker) => talker.id !== Number(id),
  );
  await fs.writeFile(PATH_FILE, JSON.stringify(talkersAfterDelete));
};

module.exports = {
  getAllTalkers,
  getTalker,
  addTalker,
  editTalker,
  deleteTalker,
  getTalkersByQuery,
};
