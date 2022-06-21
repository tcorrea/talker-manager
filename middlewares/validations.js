const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) { res.status(400).json({ message: 'O campo "email" é obrigatório' }); }
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

const isValidUser = (req, res, next) => {
  const { name, age, talk } = req.body;

  const nameNotAllowed = isValidName(name);
  if (nameNotAllowed) return res.status(400).json(nameNotAllowed);

  const ageNotAllowed = isValidAge(age);
  if (ageNotAllowed) return res.status(400).json(ageNotAllowed);

  if (!talk) {
    console.log('talk', talk);
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  const { watchedAt, rate } = talk;

  const watchedAtNotAllowed = isValidWatchedAt(watchedAt);
  if (watchedAtNotAllowed) return res.status(400).json(watchedAtNotAllowed);

  const rateNotAllowed = isValidRate(rate);
  if (rateNotAllowed) return res.status(400).json(rateNotAllowed);

  next();
};

const isValidName = (name) => {
  if (!name) return { message: 'O campo "name" é obrigatório' };
  if (name.length < 3) { return { message: 'O "name" deve ter pelo menos 3 caracteres' }; }
};

const isValidAge = (age) => {
  if (!age) return { message: 'O campo "age" é obrigatório' };
  if (Number(age) < 18) { return { message: 'A pessoa palestrante deve ser maior de idade' }; }
};

const isValidWatchedAt = (watchedAt) => {
  const dateRegex = new RegExp(/^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g);
  if (!watchedAt) return { message: 'O campo "watchedAt" é obrigatório' };
  if (!dateRegex.test(watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
};

const isValidRate = (rate) => {
  if (!rate) return { message: 'O campo "rate" é obrigatório' };
  if (!Number.isInteger(rate) || Number(rate) <= 0 || Number(rate) > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidUser,
};
