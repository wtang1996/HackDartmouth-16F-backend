import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  user: String,
  myID: String,
  myName: String,
  userID: String,
  content: [String],
  anonymous: Boolean,
  anonTitle: String,
  contacted: Boolean,
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
