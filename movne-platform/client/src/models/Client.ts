import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  investmentPreferences: {
    riskLevel: String,
    investmentGoals: [String],
    preferredInvestments: [String]
  },
  meetings: [{
    date: Date,
    summary: String,
    recordingId: String,
    transcriptionId: String
  }],
  documents: [{
    title: String,
    path: String,
    uploadDate: Date,
    type: String
  }],
  tasks: [{
    title: String,
    description: String,
    dueDate: Date,
    status: String,
    priority: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Client = mongoose.model('Client', ClientSchema);
