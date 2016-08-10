import jwt from 'jwt-simple';
import User from '../models/user_model';
import config from '../config.js';

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

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
      return res.send('User already exists');
    }
  })
  .catch(error => {
    res.json({ error });
  });

  const user = new User();
  user.email = email;
  user.password = password;
  user.save()
  .then(result => {
    res.json({ message: 'User created!' });
  })
  .catch(error => {
    res.json({ error });
  });

  res.send({ token: tokenForUser(user) });
};
