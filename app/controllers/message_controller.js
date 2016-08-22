import Message from '../models/message_model';

const cleanMessages = (messages) => {
  return messages.map(message => {
    return { id: message._id, user: message.user, content: message.content, myID: message.myID, userID: message.userID };
  });
};

export const createMessage = (req, res) => {
  Message.find({ myID: req.user._id, userID: req.body.userID })
  .then(result => {
    if (!result) {
      const message = new Message();
      message.user = req.body.user;
      message.content = req.body.content;
      message.myID = req.user._id;
      message.userID = req.body.userID;
      message.save()
      .then(res => {
        res.json({ message: 'Message created!' });
      })
      .catch(error => {
        res.json({ error });
      });
    } })
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
    res.json({ id: message._id, user: message.user, content: message.content, myID: message.myID, userID: message.userID });
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

  Message.findById(req.params.id)
  .then(message => {
    res.json({ id: message._id, user: message.user, content: message.content, myID: message.myID, userID: message.userID });
  })
  .catch(error => {
    res.json({ error });
  });
};
