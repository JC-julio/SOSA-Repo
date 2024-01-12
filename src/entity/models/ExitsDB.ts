import mongoose from 'mongoose';

const ExistsSchema = new mongoose.Schema({
  idStudent: String,
  idWorker: String,
  organizationId: String,
  time: Number,
  observes: String,
  dateExit: Date,
  confirmExit: String,
});

export const ExitsModel = mongoose.model('Exits', ExistsSchema);
