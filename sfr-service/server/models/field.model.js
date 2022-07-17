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
  city: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
  address: {
    required: true,
    type: String,
  },
  image: Object,
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