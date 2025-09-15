const Category = require("../model/categorySchema");

const categoryController = (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is not Required" });
    }
    if (!description) {
      return res.status(400).json({ message: "description is not valid" });
    }
    const category= new Category({
          name,
          description
    })
    category.save()
    res.status(200).json({
      message:"category sucessfully upload"
    })
  } catch (error) {
    console.log("categoryController Error:", error.message);
    res.status(400).json({ message: "categoryController Error" });
  }
};

const getCategory=async(req,res)=>{
        const allCategory= await Category.find({})
        res.json({message:"recived all data",
          data:allCategory
        })
}
const deleteCategory=async(req,res)=>{
       const {id}=req.params
       const findCategory= await Category.findByIdAndDelete(id)
        res.status(202).json({
          message:"deleted category",
          data:findCategory
        })
}
const updateCategory=async(req,res)=>{
      const {id}=req.params
      const update=req.body
      const UpdateCategory= await Category.findByIdAndUpdate(id,
           { $set: update })
      if (!UpdateCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: UpdateCategory,
    });
}

module.exports = {categoryController,getCategory,deleteCategory,updateCategory};
