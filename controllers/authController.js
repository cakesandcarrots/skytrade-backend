import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const login = (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
console.log(token)
    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .status(200)
      .json({ token });
  
};

export const logout = async (req, res) => {
  return res.status(200).json({ message: "Logged Out Successfully" });
};


export const checkAuth = async (req, res) => {
  if (req.user) {
    res.status(200).json({message: "success"});
  } else {
    res.sendStatus(401);
  }
};