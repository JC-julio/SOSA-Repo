import mongoose from 'mongoose';

const ManagerSchema = new mongoose.Schema({
  name: String,
  password: String,
  type: String,
  organizationId: String,
});

export const ManagerModel = mongoose.model('manager', ManagerSchema);
