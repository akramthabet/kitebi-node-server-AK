let User = require("../models/user");
const bcrypt = require("bcrypt");

exports.get = async (req, res) => {
  res.send({ user: await User.findById(req.body._id) });
};

exports.getParams = async (req, res) => {
  res.send({ user: await User.findById({ _id: req.params.userId }) });
};

exports.getAll = async (req, res) => {
  res.send({ users: await User.find() });
};

exports.add = async (req, res) => {
  const { email, password, firstname, lastname, birthdate, gender, lib, way_signup, city, region, pictureId, isVerified, role } = req.body;
  let user = await new User({
    email,
    password: await bcrypt.hash(password, 10),
    firstname,
    lastname,
    birthdate,
    gender,
    lib,
    way_signup,
    region,
    city,
    pictureId,
    isVerified,
    role,
  }).save();
  return res.send({ message: "User added successfully", user });
};

exports.update = async (req, res) => {
  const { _id, email, password, firstname, lastname, birthdate, gender, lib, city, region, pictureId, isVerified, role } = req.body;
  let user = await User.findById(_id);
  if (user) {
    await user.update({
      $set: {
        email,
        password: await bcrypt.hash(password, 10),
        firstname,
        lastname,
        birthdate,
        gender,
        lib,
        region,
        city,
        pictureId,
        isVerified,
        role,
      }
    });
    return res.send({ message: "User updated successfully" });
  } else {
    return res.status(404).send({ message: "User does not exist" });
  }
};

exports.delete = async (req, res) => {
  let user = await User.findById(req.body._id);
  if (user) {
    await user.remove();
    return res.send({ message: "Users" + user._id + " have been deleted" });
  } else {
    return res.status(404).send({ message: "User does not exist" });
  }
};

exports.deleteAll = async (req, res) => {
  await User.remove({});
  res.send({ message: "All users have been deleted" });
};

exports.toggleFavorite = async (req, res) => {
  const { _id, itemId, isBook } = req.body;

  let user = await User.findById(_id);

  if (user) {
    if (isBook) {
      if (user.favoriteBooks.includes(itemId)) {
        await user.update({
          $push: {
            favoriteBooks: itemId
          }
        });
      } else {
        await user.update({
          $pull: {
            favoriteBooks: itemId
          }
        });
      }
      return res.send({ message: "User favorite books updated successfully" });
    } else {
      if (user.favoriteAudiobooks.includes(itemId)) {
        await user.update({
          $push: {
            favoriteAudiobooks: itemId
          }
        });
      } else {
        await user.update({
          $pull: {
            favoriteAudiobooks: itemId
          }
        });
      }
      return res.send({ message: "User favorite books updated successfully" });
    }
  } else {
    return res.status(404).send({ message: "User does not exist" });
  }
};