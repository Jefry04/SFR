const uniqBy = require('lodash.uniqby');
const cloudinary = require('cloudinary').v2;

const Field = require('../models/field.model');
const User = require('../models/user.model');
const Booking = require('../models/booking.model');

module.exports = {
  async list(req, res) {
    try {
      const fields = await Field.find()
        .populate('userId')
        .populate('bookings', 'bookingDate');
      res.status(200).json({ fields });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId);

      if (!user) throw new Error('User not found');
      if (user.isAdmin === false) throw new Error('unauthorized user');

      const field = await Field.create({
        ...req.body,
        userId,
      });

      res.status(200).json({
        message: 'Cancha creada exitosamente',
        field: field,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async show(req, res) {
    try {
      const { fieldId } = req.params;
      const field = await Field.findById(fieldId).populate(
        'bookings',
        'bookingDate'
      );

      if (!field) {
        res.status(403).json({ message: 'field does not exist' });
        return;
      }

      res.status(200).json(field);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async filterField(req, res) {
    try {
      const { city, capacity } = req.query;

      const query = {};
      if (city) query.city = { $eq: city };
      if (capacity) query.capacity = { $gte: capacity };

      const fields = await Field.find(query);
      res.status(200).json(fields);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async destroy(req, res) {
    try {
      const userId = req.user;
      const { fieldId } = req.params;

      const field = await Field.findById(fieldId);

      if (!field) {
        res.status(404).json({ message: 'Cancha no existe' });
        return;
      }

      if (field.userId.toString() !== userId) {
        res.status(403).json({ message: 'unauthorized user' });
        return;
      }

      if (field.image?.publicId) {
        await cloudinary.uploader.destroy(field.image.publicId);
      }
      // get booking asociate to the field
      const booking = await Promise.all(
        field.bookings.map(async (item) => {
          return await Booking.findById(item._id);
        })
      );
      //delete booking asociate with the field
      await Promise.all(
        booking.map(async (item) => {
          return await Booking.deleteOne({ _id: item._id });
        })
      );

      await Field.deleteOne({ _id: fieldId });

      // usuarios asociados al booking
      // const user = await Promise.all(
      //   booking.map(async (item) => {
      //     return await User.findById(item.userId.toString());
      //   })
      // );

      // let uniqueUser = uniqBy(user, 'email');

      // uniqueUser.booking = uniqueUser.bookings.filter(
      //   (item) => item.toString() !== bookingId
      // );
      // res = uniqueUser.bookings.filter(
      //   (item) => !uniqueUser.bookings.includes(item._id.toString())
      // );
      // await user.save({ validateBeforeSave: false });

      // console.log('booking de la cancha', booking);
      // console.log('Usuarios unicos', uniqueUser);

      res.status(200).json({
        message: 'Field Deleted',
        field,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
