import jwt from 'jwt-simple';
import User from '../models/user_model';
import dotenv from 'dotenv';
dotenv.config({ silent: true });
const AWS = require('aws-sdk');

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

  User.findOne({ email })
  .then(user => {
    if (user) {
      return res.status(422).send('User already exists');
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.username = username;
    console.log('CREATE SNAP BODY', req.body);
    if (req.body.pic) {
      console.log('in the if statemnet');
      const x = Math.floor((Math.random() * 10000) + 1);
      newUser.key = x.toString();

      const s3bucket = new AWS.S3({ params: { Bucket: 'digup-dartmouth' } });

      AWS.config.update({ region: 'us-west-2' });
      const params = { Body: req.body.pic, ContentType: 'text/plain', Key: x.toString() };
      console.log(req.body.pic);
      s3bucket.upload(params, (err, data) => {
        if (err) {
          console.log('Error uploading data: ', err);
        } else {
          console.log('Successfully uploaded data to myBucket/myKey');
        }
      });

      var s3 = new AWS.S3();//eslint-disable-line


      var paramsTwo = { Bucket: 'digup-dartmouth', Key: x.toString() }; //eslint-disable-line
      s3.getSignedUrl('getObject', paramsTwo, (err, Url) => {
        newUser.pictureURL = Url;
        console.log('The URL is', Url);
      });

      console.log('\n');
    } else {
      newUser.pictureURL = '';
      newUser.key = '';
    }
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
  console.log('we are here', req.params, req.user);
  var s3 = new AWS.S3();//eslint-disable-line
  var paramsTwo = { Bucket: 'digup-dartmouth', Key: req.user.key }; //eslint-disable-line
  s3.getSignedUrl('getObject', paramsTwo, (err, Url) => {
    console.log('\n\nThe new Signed URL is', Url);
    res.json({ id: req.user._id, username: req.user.username, email: req.user.email, key: req.user.key, pictureURL: Url });
  });
};

export const getAuthor = (req, res) => {
  console.log('we are here', req.params);
    var s3 = new AWS.S3();//eslint-disable-line
  console.log('getting post');
  User.findById(req.params.id)
      .then(user => {
        console.log('through first find');
        var paramsTwo = { Bucket: 'digup-dartmouth', Key: user.key }; //eslint-disable-line
        s3.getSignedUrl('getObject', paramsTwo, (err, Url) => {
          console.log('\n\nThe new Signed URL is', Url);
          res.json({ id: user._id, username: user.username, email: user.email, key: user.key, pictureURL: Url });
        });
      })
    .catch(error => {
      res.json({ error });
    });
};
