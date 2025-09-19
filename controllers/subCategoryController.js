const Category = require("../model/categorySchema");
const subCategory = require("../model/subCategory");
const SubCategory = require("../model/subCategory");

const subCategoryController = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is not Required" });
    }
    if (!description) {
      return res.status(400).json({ message: "description is not valid" });
    }
    const categorys = await Category.find({ name: category });
    const id = categorys[0]._id;
    // console.log(id,"idddd")
    const subCategory = await SubCategory({
      name,
      description,
      category: id,
    });
    subCategory.save();
    const updateCategory = await Category.findByIdAndUpdate(id, {
      $push: { subCategory: subCategory.id },
    });

    res.status(200).json({
      message: "subCategory submit successfully done",
      data: subCategory,
    });
  } catch (error) {
    console.log("subCategory Error:", error.message);
    res.status(400).json({ message: "subCategory Error" });
  }
};
const deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  const DeleteSubCategory = await SubCategory.findByIdAndDelete(id).populate();
  if (!DeleteSubCategory) {
    return res.status(404).json({ message: "SubCategory not found" });
  }
  const updateCategory = await categorySchema.findByIdAndUpdate(
    DeleteSubCategory.category,
    {
      $pull: { subCategory: DeleteSubCategory._id },
    }
  );
  res.status(200).json({
    message: "delted",
    data: DeleteSubCategory,
  });
};

const getSubCategory=async(req,res)=>{
       const subCategorys= await subCategory.find({})
       if(!subCategorys){
        res.status(400).json({
          message:"subCategory is not get"
        })
       }
       res.status(200).json({
        message:"subCategory is find",
        data:subCategorys
       })
}
module.exports = { subCategoryController, deleteSubCategory ,getSubCategory };
