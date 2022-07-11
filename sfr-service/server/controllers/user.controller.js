const User = require('../models/user.model');

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
};
