
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
const getProduct=async(req,res)=>{

   const data=await Product.find({})
    if(!data){
      return res.status(400).json({
        message:"not get data"
      })
    }
    res.status(200).json({
      message:"get all data",
      data:data
    })

}

module.exports = {productController,getProduct};
