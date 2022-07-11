const { model, Schema, models } = require('mongoose');

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  fieldId: {
    type: Schema.Types.ObjectId,
    ref: 'Field',
  },
  bookingDate: {
    required: true,
    type: String,
  },
  payref: {
    type: Number,
  },
});

const Booking = model('Booking', bookingSchema);

module.exports = Booking;
