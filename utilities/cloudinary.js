const cloudinary = require('cloudinary');

const videoOptions = {resource_type: 'video'};

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const addCloudinaryUrl = function(doc) {
  const url = cloudinary.url(doc.cloudinaryName, videoOptions);
  doc.url = url;
}

module.exports = {addCloudinaryUrl: addCloudinaryUrl};
