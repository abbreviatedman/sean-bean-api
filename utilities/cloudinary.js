const cloudinary = require('cloudinary');

const videoOptions = {resource_type: 'video'};

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
  // const posterUrl = doc.posterName
  // ? cloudinary.url(doc.posterName)
  // : 'o';
  
  // const urlDoc = Object.assign({}, doc, {posterUrl});
  const urlDoc = Object.assign({}, doc, {posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY0NTkxNzQxOV5BMl5BanBnXkFtZTcwNzY5MzEzMQ@@._V1_.jpg'})
  return urlDoc;
};

module.exports = {addVideoUrl, addPosterUrl};
