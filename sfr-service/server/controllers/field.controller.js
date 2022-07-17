const Field = require('../models/field.model');
const User = require('../models/user.model');

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

      await field.deleteOne({ _id: fieldId });
      res.status(200).json(list);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
