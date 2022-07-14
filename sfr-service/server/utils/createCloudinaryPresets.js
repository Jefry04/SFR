require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api
  .create_upload_preset({
    name: 'field_preset',
    folder: 'fields',
    resource_type: 'image',
    allowed_formats: 'jpg, png, gif, webp, bmp, jpe, jpeg',
    access_mode: 'public',
    unique_filename: true,
    auto_tagging: 0.7,
    overwrite: true,

    transformation: [{ width: 480, crop: 'scale' }, { dpr: 'auto' }],
  })
  .then((uploadResult) => console.log(uploadResult))
  .catch((error) => console.error(error));

