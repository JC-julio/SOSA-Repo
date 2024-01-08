import mongoose from 'mongoose';

const ManagerSchema = new mongoose.Schema({
  name: { type: String},
  password: { type: String},
  type: { type: String},
  organizationId: { type: String},
});

export const ManagerModel = mongoose.model('manager', ManagerSchema);
