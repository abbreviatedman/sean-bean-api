const cloudinary = require('cloudinary');

const videoOptions = {resource_type: 'video'};
const posterTransformOptions = {height: 200, crop: 'scale'};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const addVideoUrl = function(doc) {
  const url = cloudinary.url(doc.cloudinaryName, videoOptions);
  const urlDoc = Object.assign({}, doc, {url});
  return urlDoc;
};

const addPosterUrl = function(doc) {
  const posterUrl = doc.posterName
  ? cloudinary.url(doc.posterName, posterTransformOptions)
  : 'o';
  
  const urlDoc = Object.assign({}, doc, {posterUrl});
  return urlDoc;
};

module.exports = {addVideoUrl, addPosterUrl};
