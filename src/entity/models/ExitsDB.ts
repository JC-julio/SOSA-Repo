import mongoose from 'mongoose';

const ExistsSchema = new mongoose.Schema({
  idStudent: String,
  idWorker: String,
  time: Number,
  observes: String,
  dateExit: Date,
  confirmExit: Boolean,
});

export const ExitsModel = mongoose.model('Exits', ExistsSchema);
