const videoOptions = {resource_type: 'video'};

const addCloudinaryUrl = function(doc) {
  const url = cloudinary.url(doc.cloudinaryName, videoOptions);
  doc.url = url;
}

module.exports = {addCloudinaryUrl: addCloudinaryUrl};
