import mongoose, { Schema } from 'mongoose';

// create a schema for lists with a field
const ListSchema = new Schema({
  title: String,
  items: [String],
  category: String,
  authorId: String,
  date: String,
});

// create model class
const ListModel = mongoose.model('List', ListSchema);

export default ListModel;
