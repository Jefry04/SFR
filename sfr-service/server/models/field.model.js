const { model, Schema, models } = require('mongoose');

const fieldSchema = new Schema({
  fieldName: {
    required: true,
    type: String,
  },
  capacity: {
    required: true,
    type: Number,
  },
  photos: {
    type: Array,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  bookings: {
    type: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
});

const Field = model('Field', fieldSchema);

module.exports = Field;