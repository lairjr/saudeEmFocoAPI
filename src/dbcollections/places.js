import mongoose from 'mongoose';

const placesSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  waitingTimeReports: { type: Number }
});

export default mongoose.model('places', placesSchema);
