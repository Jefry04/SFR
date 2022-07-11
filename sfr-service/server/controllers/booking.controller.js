const Booking = require('../models/booking.model');
const Field = require('../models/field.model');
const User = require('../models/user.model');

module.exports = {
  async list(req, res) {
    try {
      //TODO eliminar password y dastos innecesario del populate
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
      //TODO verificar si existe una reserva para esa fecha
      //customId, tocaria crearla en el modelo de booking
      //   const customId = `${bookingSiteId}${userId}${date[0]}${date[1]}`;
      //   const bookingSearch = await Booking.findOne({
      //     customId: customId,
      //   });

      //   if (bookingSearch) {
      //     console.log("entro al if de bookingg seacrh");
      //     throw new Error("Booking already exist");}
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
};
