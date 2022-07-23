const { transporter } = require('../utils/mailer');
const { format } = require('date-fns');
const Booking = require('../models/booking.model');
const Field = require('../models/field.model');
const User = require('../models/user.model');


const sendMail = async (user, bookingDate) => {
  await transporter.sendMail({
    from: `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USER}>`,
    to: user.email,
    subject: 'Reserva confirmada',
    html: `
    <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
  <!--[if mso]>
  <style>
    table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
    div, td {padding:0;}
    div {margin:0 !important;}
  </style>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    table, td, div, h1, p {
      font-family: Arial, sans-serif;
    }
    @media screen and (max-width: 530px) {
      .unsub {
        display: block;
        padding: 8px;
        margin-top: 14px;
        border-radius: 6px;
        background-color: #555555;
        text-decoration: none !important;
        font-weight: bold;
      }
      .col-lge {
        max-width: 100% !important;
      }
    }
    @media screen and (min-width: 531px) {
      .col-sml {
        max-width: 27% !important;
      }
      .col-lge {
        max-width: 73% !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;word-spacing:normal;background-color:#939297;">
  <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#939297;">
    <table role="presentation" style="width:100%;border:none;border-spacing:0;">
      <tr>
        <td align="center" style="padding:0;">
          <!--[if mso]>
          <table role="presentation" align="center" style="width:600px;">
          <tr>
          <td>
          <![endif]-->
          <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
            <tr>
              <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                <a href="http://localhost:3000/" style="text-decoration:none;"><img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c548.png" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;background-color:#ffffff;">
                <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Hola ${user.firstName}!</h1>
                <p style="margin:0;">Tu reserva esta confirmada: ${format(
                  new Date(bookingDate).getTime(),
                  'MMMM d, yyyy h:mm aa')}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                <a href="http://localhost:3000/" style="text-decoration:none;"><img src="https://www.parqueygrama.com/wp-content/uploads/2018/02/canchas-de-futbol-sinteticas-grama-de-futbol.jpg" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;background-color:#ffffff;">
                <p style="margin:0;"> Encontraras las mejores ofertas de canchas del pais.</p>
              </td>
            </tr>
          </table>
          <!--[if mso]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
    `,
    text: `Bienvenido ${user.firstName} a este nuevo proyecto, gracias por acompañarnos`,
  });
};
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
      const { bookingDate } = req.body;

      if (!user) {
        res.status(403).json({ message: 'unauthorized user' });
        return;
      }
      if (!field) {
        res.status(403).json({ message: 'Field not exist' });
        return;
      }
      sendMail(user, bookingDate);

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
