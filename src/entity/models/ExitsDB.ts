import mongoose from 'mongoose';

const ExistsSchema = new mongoose.Schema({
  nameStudent: String,
  nameWorker: String,
  time: Number,
  observes: String,
  dateExit: Date,
  confirmExit: Boolean,
});

export const ExitsModel = mongoose.model('Exits', ExistsSchema);
