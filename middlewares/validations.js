const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.includes('@') || !email.includes('.com')) {
    res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  // Esse regex aceita qualquer caractere de a - z, A - Z e 0 - 9 e seu tamanho deve ser de 16 caracteres.
  const tokenRegex = new RegExp(/^[a-zA-Z0-9]{16}$/);

  if (!tokenRegex.test(token)) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const isValidWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateRegex = new RegExp(/^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g);
  if (!watchedAt) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const isValidRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || Number(rate) <= 0 || Number(rate) > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};
// const isValidUser = (req, res, next) => {
//   const { name, age, talk } = req.body;
//   // const nameNotAllowed = isValidName(name);
//   // if (nameNotAllowed) return res.status(400).json(nameNotAllowed);
//   // const ageNotAllowed = isValidAge(age);
//   if (ageNotAllowed) return res.status(400).json(ageNotAllowed);
//   if (!talk) {
//     return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
//   }
//   const { watchedAt, rate } = talk;
//   const watchedAtNotAllowed = isValidWatchedAt(watchedAt);
//   if (watchedAtNotAllowed) return res.status(400).json(watchedAtNotAllowed);
//   const rateNotAllowed = isValidRate(rate);
//   if (rateNotAllowed) return res.status(400).json(rateNotAllowed);
//   next();
// };

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
};
