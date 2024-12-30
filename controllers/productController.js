import productModel from "../models/productModel.js";
export const createProduct = async (req, res) => {
  const product = new productModel(req.body);
  try {
    const response = await product.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const fetchProductsByFilters = async (req, res) => {
  let filterConditions = {};
  if (req.query && req.query.category) {
     filterConditions.category = req.query.category;
  }
  if (req.query && req.query.brand) {
    filterConditions.brand = req.query.brand
}

let query = productModel.find(filterConditions);

  if (req.query && req.query._sort) {
    const sortField = req.query._sort.startsWith("-")
      ? req.query._sort.slice(1)
      : req.query._sort;
    const sortOrder = req.query._sort.startsWith("-") ? -1 : 1;
    query = query.sort({ [sortField]: sortOrder });
  }

  if (req.query && req.query._page && req.query._per_page) {
    query = query
      .skip(req.query._per_page * (req.query._page - 1))
      .limit(req.query._per_page);
  }


  try {
    const totalItems = await productModel.countDocuments(filterConditions)
    const data = await query
    res.status(200).json({ items: totalItems, data: data });
  } catch (err) {
    res.status(400).json(err);
  }
};


export const fetchProductById = async (req,res)=>{
  try{
    const query = await productModel.findById(req.params.id);
    res.status(200).json(query)
  }catch(err){
    res.status(404).json(err);
  }
}

export const updateProductById = async (req,res)=>{
  try{
    const query = await productModel.findOneAndUpdate({_id:req.params.id}, req.body,{new:true});
    res.status(200).json(query);
  }
  catch(err){
    res.status(400).json(err);
  }
}

export const insertData = async (req,res) => {
    const result = await productModel.insertMany(req.body);
    return res.status(200).json(result);
  
};