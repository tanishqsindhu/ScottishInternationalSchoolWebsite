const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = async (file, folder = 'Scottish') => {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataURI, {
        folder,
        resource_type: 'auto'
    });
    return {
        url: result.secure_url,
        filename: result.public_id
    };
};

const uploadMultipleToCloudinary = async (files, folder = 'Scottish') => {
    const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
    return Promise.all(uploadPromises);
};

module.exports = {
    cloudinary,
    upload,
    uploadToCloudinary,
    uploadMultipleToCloudinary
}