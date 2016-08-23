import Post from '../models/post_model';
// const fs = require('fs');
const AWS = require('aws-sdk');

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags.toString(), anonymous: post.anonymous, lost: post.lost, authorId: post.authorId, authorName: post.authorName, key: post.key, pirctureURL: post.pictureURL };
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags.split(' ');
  post.content = req.body.content;
  post.authorName = req.user.username;
  post.authorId = req.user._id;
  post.lost = req.body.lost;
  post.anonymous = req.body.anonymous;
  post.resolved = req.body.resolved;
  console.log('CREATE SNAP BODY', req.body);
  if (req.body.pic) {
    console.log('in the if statemnet');
    const x = Math.floor((Math.random() * 10000) + 1);
    post.key = x.toString();

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
      post.pictureURL = Url;
      console.log('The URL is', Url);
    });

    console.log('\n');
  } else {
    post.pictureURL = '';
    post.key = '';
  }
  console.log(post);
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
    console.log('created');
  })
  .catch(error => {
    console.log('is this is an error');
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find()
  .then(posts => {
    res.json(cleanPosts(posts));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    res.json({ title: post.title, tags: post.tags.join(), content: post.content, author: post.authorName, anonymous: post.anonymous, lost: post.lost, authorId: post.authorId });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deletePost = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    post.remove()
    .then(() => {
      res.json({ message: 'Post removed!' });
    })
    .catch(error => {
      res.json({ error });
    });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updatePost = (req, res) => {
  if (req.body.title !== '') {
    Post.find().where({ _id: req.params.id })
    .update({ title: req.body.title })
    .catch(error => {
      res.json({ error });
    });
  }
  if (req.body.tags !== '') {
    Post.find().where({ _id: req.params.id })
    .update({ tags: req.body.tags.split(' ') })
    .catch(error => {
      res.json({ error });
    });
  }
  if (req.body.content !== '') {
    Post.find().where({ _id: req.params.id })
    .update({ content: req.body.content })
    .catch(error => {
      res.json({ error });
    });
  }

  Post.findById(req.params.id)
  .then(post => {
    res.json({ id: post._id, title: post.title, tags: post.tags.toString(), content: post.content, author: post.authorName, authorId: post.authorId, lost: post.lost });
  })
  .catch(error => {
    res.json({ error });
  });
};
