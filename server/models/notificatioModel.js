import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer', required: false },
  reservedby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },

  reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Notification = mongoose.model('Notification', notificationSchema);


