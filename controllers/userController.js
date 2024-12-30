import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const fetchLoggedInUserDetails = async (req, res) => {
  console.log(req.user)
  try {
    const query = await userModel.findOne({ _id: req.user.id });
   return res.status(200).json(query);
  } catch (err) {
   return  res.status(404).json(err);
  }
};

export const createUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new userModel({ ...req.body, password: hashedPassword });

    await user.save();

    req.login(user, (err) => {
      if (err) {
        return res.status(401).json({ message: "Login failed." });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res
        .cookie("jwt", token, {
          expires: new Date(Date.now() + 3600000), 
          httpOnly: true,
        })
        .status(201)
        .json({ token });
    });
  } catch (err) {
    res.status(400).json({ message: "User creation failed.", error: err });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const query = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
   return  res.status(200).json(query);
  } catch (err) {
  return  res.status(400).json(err);
  }
};
