import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const MessageSchema = new Schema({
  user: String,
  content: String,
  time: Date,
});

// create model class
const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
