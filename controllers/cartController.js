import cartModel from "../models/cartModel.js";


export const fetchCartByUser=async(req,res)=>{
    const query = cartModel.find({user: req.query.user}).populate('user').populate('product');
    try{
        const data = await query;
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err);
    }

}


export const addToCart = async (req, res) => {
    const cart = new cartModel(req.body);
    try {
      const response = await cart.save()
      const data = await response.populate('product')
      console.log(response)
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  export const deleteFromCart = async (req,res)=>{
    try{
      const query = await cartModel.findByIdAndDelete(req.params.id);
      res.status(200).json(query)
    }catch(err){
      res.status(404).json(err);
    }
  }

  export const updateCart = async (req,res)=>{
    try{
        console.log(req.body)
        console.log(req.params.id)
      const query = await cartModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
      const data = await  query.populate('product')
      console.log(query)
      res.status(200).json(data)
    }catch(err){
      res.status(404).json(err);
    }
  }

