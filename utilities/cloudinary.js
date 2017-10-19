const videoOptions = {resource_type: 'video'};

export function addCloudinaryUrl(doc) {
  const url = cloudinary.url(doc.cloudinaryName, videoOptions);
  doc.url = url;
}