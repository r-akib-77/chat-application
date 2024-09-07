import User from "./../models/userModel.js";
export const getUserForSidebar = async (req, res) => {
  try {
    /// req.user._id comes from protected route my id n
    const loggedInUserId = req.user._id;
    // showing all id except mine
    const filterUsers = await User.find({
      _id: {
        $ne: loggedInUserId,
      },
    }).select("-password");
    return res.status(200).json(filterUsers);
  } catch (error) {
    console.log(`error in getUserForSidebar`, error.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};
