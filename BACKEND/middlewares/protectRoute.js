import jwt from "jsonwebtoken";
import User from "./../models/userModel.js";
const protectRoute = async (req, res, next) => {
  try {
    // get token from cookies and store into const token
    const token = req.cookies.jwt;

    // if there is no token then
    if (!token) {
      return res.status(401).json({
        error: " unauthorized -- not token provided",
      });
    }
    // if there is token then verify with jwt and my secrect key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if token is not valid
    if (!decoded) {
      return res.status(401).json({
        error: " unauthorized -- not valid token",
      });
    }

    // here userId comes from payload and select is for not showing the password in user
    const user = await User.findById(decoded.userId).select("-password");

    // if there is no user
    if (!user) {
      return res.status(401).json({
        error: " unauthorized -- user not found",
      });
    }
    // return the user object
    req.user = user;

    /// callign the next function
    next();
  } catch (error) {
    console.log("error in protectRoute", error);
    res.status(500).json({
      error: "internal server error ",
    });
  }
};

export default protectRoute;
