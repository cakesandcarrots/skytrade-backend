import categoryModel from "../models/categoryModel.js";


export const fetchAllCategories=async(req,res)=>{
    const query = categoryModel.find({});
    try{
        const data = await  query.exec();
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err);
    }
}

export const createCategory = async (req, res) => {
    const category = new categoryModel(req.body);
    try {
      const response = await category.save();
      res.status(201).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
