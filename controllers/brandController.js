import brandModel from "../models/brandModel.js";

export const fetchAllBrands=async(req,res)=>{
    const query = brandModel.find({});
    try{
        const data = await query;
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err);
    }

}


export const createBrand = async (req, res) => {
    const brand = new brandModel(req.body);
    try {
      const response = await brand.save();
      res.status(201).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  };