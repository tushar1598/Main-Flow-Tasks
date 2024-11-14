const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const dotenv = require("dotenv").config();
const path = require("path");
const fs = require("fs");

module.exports.Createuser = async function (req, res) {
  const { name, email, phone, password } = req.body;
  const profileImage = req.file ? req.file.filename : null;
  let alreadyuser = await User.findOne({ email: email });
  let alreadyusernumber = await User.findOne({ phone: phone });
  if (!alreadyuser && !alreadyusernumber) {
    let Password = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      phone,
      password: Password,
      profileImage: `/uploads/${profileImage}`,
    });
    return res.status(200).json({
      message: "user created",
      user,
    });
  }
  return res.status(200).json({
    message: "user already founded",
    user: null,
  });
};

module.exports.Createsession = async function (req, res) {
  const { email, password } = req.body;
  const userfound = await User.findOne({ email: email });
  if (userfound !== null) {
    let Password = await bcrypt.compare(password, userfound.password);
    if (Password) {
      const Token = jwt.sign(
        { id: userfound._id, email: userfound.email },
        process.env.secretKey,
        { expiresIn: "2hr" }
      );
      return res.status(200).json({
        Token,
      });
    }
    return res.status(200).json({
      Password: false,
    });
  }
  return res.status(200).json({
    user: null,
  });
};

module.exports.Protected = async function (req, res) {
  return res.status(200).json({
    message: "Authentication Successfull",
    user: req.user,
  });
};

module.exports.Resetpasswordlink = async function (req, res) {
  const { email } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.passcode,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    transporter.sendMail({
      from: user.email,
      to: process.env.email,
      subject: "Password Reset Link",
      html: `http://localhost:5173/users/reset-password/${user._id}`,
    });
    return res.status(200).json({
      message: "Reset Password Link Sent Successfully!!",
      link: true,
    });
  }
  return res.status(200).json({
    message: "user is not found",
    link: false,
  });
};

module.exports.Resetpassword = async function (req, res) {
  const { id, password } = req.body;
  let Password = await bcrypt.hash(password, 10);
  let reset = await User.findByIdAndUpdate(id, { password: Password });
  return res.status(200).json({
    reset,
  });
};

module.exports.Getprofile = async function (req, res) {
  const { userId } = req.query;
  const user = await User.findById(userId);
  return res.status(200).json({
    data: user,
  });
};

module.exports.Editprofile = async function (req, res) {
  const { _id, name, email, phone } = req.body;
  const updated = await User.findByIdAndUpdate(_id, {
    name,
    email,
    phone,
  });
  return res.status(200).json({
    updated,
  });
};

module.exports.Profilephoto = async function (req, res) {
  const { id } = req.params;
  const newImagePath = `/uploads/${req.file.filename}`;
  try {
    // Fetch the current profile image path
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const oldImagePath = user.profileImage;
    // Delete the old image file if it exists
    if (oldImagePath && oldImagePath !== newImagePath) {
      const fullOldImagePath = path.join(__dirname, "..", oldImagePath);
      fs.unlink(fullOldImagePath, (err) => {
        if (err) {
          console.error(`Failed to delete old image: ${err}`);
        }
      });
    }
    // Update the user's profile image path in the database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profileImage: newImagePath },
      { new: true } // This returns the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ profileImage: newImagePath });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the profile photo" });
  }
};

module.exports.Search = async function (req, res) {
  // const { query } = req.query;
  // const collection = mongoose.connection.db.collection("Items");
  // try {
  //   const products = await collection
  //     .find({
  //       name: { $regex: query, $options: "i" }, // Case-insensitive search
  //     })
  //     .toArray();
  //   return res.json(products);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: "Failed to fetch search results" });
  // }
};
