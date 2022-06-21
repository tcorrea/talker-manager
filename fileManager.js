const fs = require('fs/promises');

const readContentFile = async () => JSON.parse(await fs.readFile('./talker.json'));

const writeContentFile = async (data) => {
  const talkers = await readContentFile();
  data.id = talkers.length + 1;
  talkers.push(data);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
};

module.exports = { writeContentFile, readContentFile };
