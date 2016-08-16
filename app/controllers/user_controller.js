import jwt from 'jwt-simple';
import User from '../models/user_model';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.API_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  // 🚀 TODO:
  // here you should do a mongo query to find if a user already exists with this email.
  // if user exists then return an error. If not, use the User model to create a new user.
  // Save the new User object
  // this is similar to how you created a Post
  // and then return a token same as you did in in signin
  User.findOne({ email })
  .then(user => {
    if (user) {
      return res.status(422).send('User already exists');
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.username = username;
    newUser.save()
    .then(result => {
      res.json({ message: 'User created!' });
    })
    .catch(error => {
      res.json({ error });
    });

    res.send({ token: tokenForUser(newUser) });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getUser = (req, res) => {
  res.json({ username: req.user.username, email: req.user.email });
};
