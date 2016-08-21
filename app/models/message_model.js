import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  user: String,
  myID: String,
  userID: String,
  content: String,
  time: Date,
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
