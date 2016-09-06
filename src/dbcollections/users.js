import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  reportNumber: { type: Number, required: true, default: 0 }
});

export default mongoose.model('users', usersSchema);
