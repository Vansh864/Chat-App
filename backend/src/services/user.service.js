import userModel from "../models/user.model.js";

export const getUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};
