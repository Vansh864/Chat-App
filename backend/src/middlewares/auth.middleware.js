import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorised - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorised - Invalid token" });
    }

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorised - User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export default authenticateUser;
