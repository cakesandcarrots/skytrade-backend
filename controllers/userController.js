import userModel from "../models/userModel.js";

export const fetchLoggedInUserDetails = async (req, res) => {
  try {
    const query = await userModel.findOne({ _id: req.query.id });
    res.status(200).json(query);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const createUser = async (req, res) => {
  const user = new userModel(req.body,"id email");
  try {
    const response = await user.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateUserById = async (req, res) => {
  try {
    const query = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(query);
  } catch (err) {
    res.status(400).json(err);
  }
};
