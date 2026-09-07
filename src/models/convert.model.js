import mongoose from 'mongoose';

const ConvertSchema = new mongoose.Schema({
  originalName: String,
  convertedName: String,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  },
  format: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Convert', ConvertSchema);