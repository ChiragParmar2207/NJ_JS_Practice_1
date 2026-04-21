const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    status: { type: String, enum: ['active', 'deleted'], default: 'active' },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

module.exports = mongoose.model('users', userSchema);
