const videoOptions = {resource_type: 'video'};

function addCloudinaryUrl(doc) {
  const url = cloudinary.url(doc.cloudinaryName, videoOptions);
  doc.url = url;
}

module.exports = {addCloudinaryUrl};