const Product = require("../model/productSchema");
const uploadResult =require("../utils/cloudinay")
const productController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      color,
      discount,
      storage,
      category,
      subCategory,
    } = req.body;

    // req.file contains the uploaded single image
    const imagePath = req.file.path;
    const cloudPath=await uploadResult(imagePath)
    // console.log(cloudPath,"cnrol;er")
    const newProduct = new Product({
      name,
      description,
      price,
      color,
      discount,
      storage,
      category,
      subCategory,
      image: cloudPath, // save single image path
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("productController Error:", error.message);
    res.status(400).json({
      message: "Product controller server error",
    });
  }
};

module.exports = productController;
