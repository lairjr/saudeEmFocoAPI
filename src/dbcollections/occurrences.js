import mongoose from 'mongoose';

const occurrencesSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, required: true },
  location: {
    type: {
      type: String,
      required: true
    },
    coordinates: [Number]
  }
});

export default mongoose.model('occurrences', occurrencesSchema);
