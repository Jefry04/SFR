const busboy = require('busboy');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PRESETS = {
  fieldPhoto: 'field_preset',
};

const destroyResource = async (publicId) => {
  try {
    if (publicId) {
      const cloudRes = await cloudinary.uploader.destroy(publicId);
      return cloudRes;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return { result: 'failed' };
};

const formData = (req, _res, next) => {
  const body = {};
  const bb = busboy({ headers: req.headers });


  // vars for controller the upload of files
  let uploadingFile = false;
  let uploadingCount = 0;

  /**
   * Method in charge of exiting the middleware when
   * all the files and properties has been loaded.
   */
  const done = () => {
    if (uploadingFile) return;
    if (uploadingCount > 0) return;

    req.body = body;
    next();
  };

  bb.on('field', (key, value) => {
    body[key] = value;
  });

  bb.on('file', (key, file, info) => {
    let preset = 'ml_default';

    /**
     * mimeType es un string de la forma image/jpg - image/gif - video/mp4
     */
    const { mimeType } = info;
    const [fileType] = mimeType.split('/');
    const options = {};

    uploadingFile = true;
    uploadingCount += 1;


    options.upload_preset = PRESETS.fieldPhoto;
    options.resource_type = fileType;

    const cloud = cloudinary.uploader.upload_stream(
      options,
      (cloudErr, cloudRes) => {
        if (cloudErr) {
          next(cloudErr);
        }

        if (cloudRes) {
       
          const {
            public_id: publicId,
            width,
            height,
            format,
            resource_type: type,
            secure_url: url,
          } = cloudRes;
          body[key] = { publicId, width, height, format, type, url };
        }

        uploadingFile = false;
        uploadingCount -= 1;
        done();
      }
    );

    file.on('data', (data) => {
      cloud.write(data);
    });

    file.on('end', () => {
      cloud.end();
    });
  });

  bb.on('finish', () => {
    done();
  });

  req.pipe(bb);
};

module.exports = { destroyResource, formData };
