const User = require('../models/user.model');
const { transporter } = require('../utils/mailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sendMail = async (user) => {
  await transporter.sendMail({
    from: `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USER}>`,
    to: user.email,
    subject: 'Bienvenido a SFR',
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
                <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Bienvenido ${user.firstName} a SFR!</h1>
                <p style="margin:0;">Bienvenido al mejor sitio para conseguir canchas de futbol, <a href="http://localhost:3000/" style="color:#f70606;text-decoration:underline;">SFR</a>, esperamos sea de tu agrado.</p>
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
  async signup(req, res) {
    const passwordRegex = new RegExp(
      '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
    );
    try {
      const { password, confirmPassword, email, firstName, lastName, isAdmin } =
        req.body;

      if (password !== confirmPassword) {
        res.status(403).json({ message: 'Contraseñas no coinciden' });
        return;
      }
      const validatePassword = passwordRegex.test(password);
      if (!validatePassword) {
        res
          .status(403)
          .json({ message: 'Contraseñas no es suficiemente fuerte' });
        return;
      }

      const encPassword = await bcrypt.hash(password, 8);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: encPassword,
        isAdmin,
      });
      sendMail(user);

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({ token, message: 'User created', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error('Usuario o contraseña invalida');
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({ token, message: 'User login successfully', user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

};
