const fs = require('fs/promises');

const writeContentFile = async (data) => {
  const talkers = await readContentFile();
  talkers.push(data);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
}

const readContentFile = async () => {
  return JSON.parse(await fs.readFile('./talker.json'));
}

module.exports = {
  writeContentFile,
  readContentFile,
} 
