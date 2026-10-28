import cloudinary from "../lib/cloudinary";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserID = req.user._id;
    const filteredUser = await userModel
      .find({ _id: { $ne: loggedInUserID } })
      .select("-password");

    res.status(200).json({ filteredUser });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserID = req.user._id;

    const message = await messageModel.find({
      $or: [
        { senderId: id, receiverId: loggedInUserID },
        { senderId: loggedInUserID, receiverId: id },
      ],
    });

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Server Error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id } = req.params; //receiverId
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId: id,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //TODO: implement socket to send message to reciever for realtime chat
    res.status(200).json({ newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Server Error" });
  }
};
