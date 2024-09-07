import bycrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

/// SIGNUP FUNCTION
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "password dontttt match",
      });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }
    /// HASH PASSWORD HERE
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    //AVATAR SELECTION PART
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      password: hashedPassword,
      gender,
      username,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    /// GENERATE JWT TOKEN HERE
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      password: newUser.password,
      gender: newUser.gender,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "internal server error ",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bycrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid username or password ",
      });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "internal server error ",
    });
  }
};

export const logout = (req, res) => {
  try {
    // you can access cookie by req.cookie
    res.cookie("jwt", { maxAge: 0 });
    res.status(200).json({
      messsage: "logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "internal server error ",
    });
  }
};
