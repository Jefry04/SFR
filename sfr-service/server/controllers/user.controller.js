const User = require('../models/user.model');
const Field = require ('../models/field.model');
module.exports = {

  async show(req, res) {
    try {
      //TODO mostrar solo las bookingdate
      const userId = req.user;
      const user = await User.findById(userId).populate('bookings', 'bookingDate')

      if (!user) {
        throw new Error('User not found');
      }

      res.status(200).json({user})
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getFieldByUserId(req, res) {
    try {
      const userId = req.user;
      console.log(userId)
      const user = await User.findById(userId).populate('bookings', 'bookingDate')
      console.log(user)
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
};
