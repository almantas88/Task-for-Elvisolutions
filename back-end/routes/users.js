const router = require("express").Router();
const User = require("../models/user.model");

router.post("/createUser", async (req, res) => {
  try {
    let {
      email,
      firstName,
      lastName,
    } = req.body;

    if (
      !email ||
      !firstName ||
      !lastName
    ) {
      return res.status(400).json({ msg: "Some fields were empty." });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "User with this email exists." });
    const newUser = new User({
      email,
      firstName,
      lastName
    });
    const savedUser = await newUser.save();
    res.status(200).json({ msg: "New user was created!", id: savedUser._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});


router.delete("/deleteUser", async (req, res) => {
  try {
    console.log(req.body);
    const existingUser = await User.findOne({ _id: req.body.userID });
    if (!existingUser)
      return res
        .status(400)
        .json({ msg: "There is no such user." });

    const deletedUser = await User.deleteOne({ _id: req.body.userID });

    res.json({ msg: "Vartotojas sėkmingai ištrintas!" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await User.find().sort({
      _id: "asc",
    });
    return res.status(200).send({
      users: allUsers,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/oneUser", async (req, res) => {
  try {
    console.log(req.body);
    const foundUser = await User.findOne({ _id: req.body.ID });
    if (!foundUser)
      return res.status(400).send({ msg: "There is no such user." });
    return res.status(200).send({
      user: foundUser,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.put("/updateUser", async (req, res) => {
  try {
    console.log(req.body);
    let { email, firstName, lastName } =
      req.body;

    if (!email || !firstName || !lastName ) {
      return res.status(400).json({ msg: "Some fields were empty.." });
    }
    const foundUser = await User.findOne({ _id: req.body._id });
    if (!foundUser)
      return res.status(400).send({ msg: "There is no such user." });

    const newUserInfo = {
      email,
      firstName,
      lastName,
      
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body._id },
      newUserInfo
    );

    return res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
