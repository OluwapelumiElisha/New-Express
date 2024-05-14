const cloudinary = require('../Utils/Cloudinary-Setup')
const handleUploadImage = async(req, res) =>{
    console.log(req.file);
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SQIImage",
    });
    console.log(result.public_id);
    res.json(result);
  } catch (error) {
    res.json({ message: error });
    console.log(error);
  }
}



const handleUploadVideo = async(req, res) =>{
  console.log(req.file);
try {
  const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto'
  });
  console.log(result);
  res.json(result);
} catch (error) {
  res.json({ message: error });
  console.log(error);
}
}

const handleUploadPdf = async(req, res) =>{
  console.log(req.file);
try {
  const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw'
  });
  console.log(result);
  res.json(result);
} catch (error) {
  res.json({ message: error });
  console.log(error);
}
}


module.exports = {handleUploadImage, handleUploadVideo,handleUploadPdf}