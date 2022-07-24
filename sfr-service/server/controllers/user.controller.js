const User = require('../models/user.model');
const Field = require('../models/field.model');
const Booking = require('../models/booking.model');

module.exports = {
  async show(req, res) {
    try {
      //TODO mostrar solo las bookingdate
      const userId = req.user;
      const user = await User.findById(userId).populate(
        'bookings',
        'bookingDate'
      );

      if (!user) {
        throw new Error('User not found');
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getFieldByUserId(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId).populate(
        'bookings',
        'bookingDate'
      );
      if (!user) {
        throw new Error('User not found');
      }
      const fields = await Field.find({ userId: user.id });

      if (!fields) {
        res.status(403).json({ message: 'fields does not exist' });
        return;
      }

      res.status(200).json(fields);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async getUserBookings(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId).populate(
        'bookings',
        'bookingDate'
      );
      if (!user) {
        throw new Error('User not found');
      }

      const bookings = await Booking.find({ userId: user.id }).populate(
        'fieldId'
      );
      if (!bookings) {
        res.status(403).json({ message: 'user does not have booking yet' });
        return;
      }

      res.status(200).json(bookings);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
