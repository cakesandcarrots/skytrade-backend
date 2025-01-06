import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { invoiceMail } from "../services/common.js";
import { sendMailReq } from "../services/common.js";
export const fetchLoggedInUserOrders=async(req,res)=>{
    const query = orderModel.find({"user.id": req.user.id});
    try{
        const data = await query;
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err);
    }
}


export const fetchAllOrders = async (req, res) => {  
  let query = orderModel.find({});

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
      const totalItems = await orderModel.countDocuments({})
      const data = await query
      res.status(200).json({ items: totalItems, data: data });
    } catch (err) {
      res.status(400).json(err);
    }
  };




export const createOrder = async (req, res) => {
    const order = new orderModel(req.body);
    for(let item of order.items){
      let product = await productModel.findOne({_id:item.product.id})
      product.$inc('stock',-1 * item.quantity)
      product.save();
    }
    
    try {
      const response = await order.save()
      await sendMailReq({ to:order.user[0].email  , subject:"Thanks for ordering with Skytrade", html: invoiceMail(order) });
      res.status(201).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  export const deleteOrder = async (req,res)=>{
    try{
      const query = await orderModel.findByIdAndDelete(req.params.id);
      res.status(200).json(query)
    }catch(err){
      res.status(404).json(err);
    }
  }

  export const updateOrder = async (req,res)=>{
    try{
      const query = await orderModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.status(200).json(query)
    }catch(err){
      res.status(404).json(err);
    }
  }

