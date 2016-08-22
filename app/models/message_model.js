import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  user: String,
  myID: String,
  myName: String,
  userID: String,
  content: [String],
  anonymous: Boolean,
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
