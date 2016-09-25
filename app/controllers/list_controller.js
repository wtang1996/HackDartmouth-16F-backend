import List from '../models/list_model';
const AWS = require('aws-sdk');

const cleanLists = (lists) => {
  return lists.map(list => {
    return { id: list._id, title: list.title, items: list.items.toString(), category: list.category, authorId: list.authorId, date: list.date };
  });
};

const cleanList = (list) => {
  console.log(list);
  return { id: list._id, title: list.title, items: list.items.toString(), category: list.category, authorId: list.authorId, date: list.date };
};


export const createList = (req, res) => {
  const list = new List();
  list.title = req.body.title;
  list.items = req.body.items.split(' ');
  list.category = req.body.category;
  list.authorId = req.user._id;
  list.date = req.body.date;

  if (req.body.pic) {
    const x = Math.floor((Math.random() * 10000) + 1);
    list.key = x.toString();

    const s3bucket = new AWS.S3({ params: { Bucket: 'digup-dartmouth' } });

    AWS.config.update({ region: 'us-west-2' });
    const params = { Body: req.body.pic, ContentType: 'text/plain', Key: x.toString() };
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
      console.log('The URL is', Url);
    });

    console.log('\n');
  }

  console.log(list);
  list.save()
  .then(result => {
    res.json({ message: 'List created!' });
    console.log('created');
  })
  .catch(error => {
    console.log('is this is an error');
    res.json({ error });
  });
};

export const getLists = (req, res) => {
  List.find()
  .then(lists => {
    res.json(cleanLists(lists));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getList = (req, res) => {
  console.log('we are here get list', req.params);
    var s3 = new AWS.S3();//eslint-disable-line
  List.findById(req.params.id)
      .then(post => {
        console.log('through first find');
        var paramsTwo = { Bucket: 'digup-dartmouth', Key: list.key }; //eslint-disable-line
        s3.getSignedUrl('getObject', paramsTwo, (err, Url) => {
          console.log('\n\nThe new Signed URL is', Url);
          List.findOneAndUpdate({ _id: req.params.id }, {
            pictureURL: Url,
          }).then(() => {
            List.findById(req.params.id)
              .then((post2) => {
                res.json(cleanList(post2));
              })
            .catch(error => {
              res.json({ error });
            });
          })
          .catch(error => {
            res.json({ error });
          });
        });
      })
    .catch(error => {
      res.json({ error });
    });
};

export const deleteList = (req, res) => {
  List.findById(req.params.id)
  .then(list => {
    list.remove()
    .then(() => {
      res.json({ message: 'List removed!' });
    })
    .catch(error => {
      res.json({ error });
    });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updateList = (req, res) => {
  if (req.body.title !== '') {
    List.find().where({ _id: req.params.id })
    .update({ title: req.body.title })
    .catch(error => {
      res.json({ error });
    });
  }
  if (req.body.items !== '') {
    List.find().where({ _id: req.params.id })
    .update({ items: req.body.items.split(' ') })
    .catch(error => {
      res.json({ error });
    });
  }

  List.findById(req.params.id)
  .then(list => {
    res.json({ id: list._id, title: list.title, items: list.items.toString(), authorId: list.authorId });
  })
  .catch(error => {
    res.json({ error });
  });
};
