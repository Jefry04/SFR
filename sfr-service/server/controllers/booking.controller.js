const Booking = require('../models/booking.model');
const Field = require('../models/field.model');
const User = require('../models/user.model');

module.exports = {
  async list(req, res) {
    try {
      const booking = await Booking.find()
        .populate('userId')
        .populate('fieldId');
      res.status(200).json({ booking });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user;
      const { fieldId } = req.params;
      const user = await User.findById(userId);
      const field = await Field.findById(fieldId);
      if (!user) {
        res.status(403).json({ message: 'unauthorized user' });
        return;
      }
      if (!field) {
        res.status(403).json({ message: 'Field not exist' });
        return;
      }

      const booking = await Booking.create({
        ...req.body,
        userId,
        fieldId,
      });

      user.bookings.push(booking);
      field.bookings.push(booking);
      await user.save({ validateBeforeSave: false });
      await field.save({ validateBeforeSave: false });

      res.status(200).json({
        message: 'Booking created successfully',
        booking,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async filter(req, res) {
    const { fieldId } = req.params;
    boookingsByField = await Booking.find({
      fieldId: { $eq: fieldId },
    }).populate('fieldId');

    res.status(200).json({ boookingsByField });
    try {
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getBookingById(req, res) {
    const { bookingId } = req.params;
    boookingById = await Booking.findById(bookingId);

    res.status(200).json({ boookingById });
    try {
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const { bookingId } = req.params;
      const userId = req.user;

      const booking = await Booking.findById(bookingId);

      if (!booking) throw new Error('Booking not found.');

      if (booking.userId.toString() !== userId)
        throw new Error('Acción denegada.');
      const bookingFieldId = booking.fieldId.toString();
      const bookingUserId = booking.userId.toString();

      const field = await Field.findById(bookingFieldId);
      const user = await User.findById(bookingUserId);

      await booking.deleteOne({ _id: bookingId });

      user.bookings = user.bookings.filter(
        (item) => item.toString() !== bookingId
      );
      field.bookings = field.bookings.filter(
        (item) => item.toString() !== bookingId
      );
      await user.save({ validateBeforeSave: false });
      await field.save({ validateBeforeSave: false });

      res.status(200).json({
        message: 'Booking deleted',
        booking,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
