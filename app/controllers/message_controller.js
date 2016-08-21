import Message from '../models/message_model';

const cleanMessages = (messages) => {
  return messages.map(message => {
    return { id: message._id, user: message.user, content: message.content, time: new Date(), myID: message.myID, userID: message.userID };
  });
};

export const createMessage = (req, res) => {
  const message = new Message();
  message.user = req.body.user;
  message.content = req.body.content;
  message.time = new Date();
  message.myID = req.user._id;
  // front end needs to pass in targetEmail
  Message.findOne({ email: req.body.targetEmail })
  .then(user => {
    res.json({ userID: user._id });
  });
  message.save()
  .then(result => {
    res.json({ message: 'Message created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getMessages = (req, res) => {
  Message.find()
  .then(messages => {
    res.json(cleanMessages(messages));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getMessage = (req, res) => {
  Message.findById(req.params.id)
  .then(message => {
    res.json({ user: message.user, content: message.content, time: message.time });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deleteMessage = (req, res) => {
  Message.findById(req.params.id)
  .then(message => {
    message.remove()
    .then(() => {
      res.json({ message: 'Message removed!' });
    })
    .catch(error => {
      res.json({ error });
    });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updateMessage = (req, res) => {
  if (req.body.user !== '') {
    Message.find().where({ _id: req.params.id })
    .update({ user: req.body.user })
    .catch(error => {
      res.json({ error });
    });
  }
  if (req.body.content !== '') {
    Message.find().where({ _id: req.params.id })
    .update({ content: req.body.content })
    .catch(error => {
      res.json({ error });
    });
  }
  if (req.body.time !== '') {
    Message.find().where({ _id: req.params.id })
    .update({ time: new Date() })
    .catch(error => {
      res.json({ error });
    });
  }

  Message.findById(req.params.id)
  .then(message => {
    res.json({ id: message._id, user: message.user, content: message.content, time: new Date() });
  })
  .catch(error => {
    res.json({ error });
  });
};
