import cartModel from "../models/cartModel.js";


export const fetchCartByUser=async(req,res)=>{
    const query = cartModel.find({user: req.user.id}, { quantity: 1, product: 1, user: 1, _id: 0 }).populate('user').populate('product');
    try{
        const data = await query;
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err);
    }

}


export const addToCart = async (req, res) => {
  const query = {...req.body,user: req.user.id}
    const cart = new cartModel(query);
    try {
      const response = await cart.save()
      const data = await response.populate('product')
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  export const deleteFromCart = async (req,res)=>{
    try{
      const query = await cartModel.findOneAndDelete({user: req.params.id});
      res.status(200).json(query)
    }catch(err){
      res.status(404).json(err);
    }
  }

  export const updateCart = async (req,res)=>{
    try{
      const query = await cartModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
      const data = await  query.populate('product')
      res.status(200).json(data)
    }catch(err){
      res.status(404).json(err);
    }
  }

