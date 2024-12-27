import userModel from "../models/userModel.js";
export const login = async (req, res) => {
    try {
      const query = await userModel.findOne(
        { email: req.body.email },
        "id email password"
      );

  
      if (!query) {
        return res.status(404).json({message: "No user exists with this email "});
      }

      if (query.password === req.body.password) {
       return  res.status(200).json(query);
      } else {
       return  res.status(400).json({ message: "Login Failed" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  };
  

  export const logout = async (req,res)=>{
    return res.status(200).json({message: "Logged Out Successfully"})
  }