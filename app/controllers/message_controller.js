import Message from '../models/message_model';

const cleanMessages = (messages) => {
  return messages.map(message => {
    return { id: message._id, user: message.user, myName: message.myName,
      content: message.content, myID: message.myID, userID: message.userID, anonymous: message.anonymous };
  });
};

export const createMessage = (req, res) => {
  const message = new Message();
  message.user = req.body.user;
  message.content = req.body.content;
  message.myID = req.user._id;
  message.userID = req.body.userID;
  message.myName = req.user.username;
  message.anonymous = req.body.anonymous;
  message.save()
  .then(res => {
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
    res.json({ id: message._id, user: message.user, content: message.content,
      myID: message.myID, userID: message.userID, myName: message.myName, anonymous: message.anonymous });
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
  if (req.body.content !== '') {
    Message.find().where({ _id: req.params.id })
    .update({ content: req.body.content })
    .catch(error => {
      res.json({ error });
    });
  }

  Message.findById(req.params.id)
  .then(message => {
    res.json({ id: message._id, user: message.user, content: message.content,
      myID: message.myID, userID: message.userID, myName: message.myName, anonymous: message.anonymous });
  })
  .catch(error => {
    res.json({ error });
  });
};
