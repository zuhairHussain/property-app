var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../../config");
const User = require("../models/user.model");
const { ErrorHandler } = require('../../lib/errorHandler');

exports.get_all_users = async function (req, res, next) {
  try {

    let findUser = await User.find({});
    if (!findUser)
      throw new ErrorHandler(404, 'No users found!');

    res.status(200).send({ users: findUser });

  } catch (err) {
    next(err)
  }
};

exports.delete_user = async function (req, res, next) {
  try {

    const { id } = req.body;

    if(!id)
      throw new ErrorHandler(400, 'id is required');

    let findUser = await User.deleteOne({ _id: id });
    if (!findUser)
      throw new ErrorHandler(400, 'Something went wrong please try again!');

    res.status(200).send({ error: false, message: "User successfully deleted!" });

  } catch (err) {
    next(err)
  }
};

exports.update_user = async function (req, res, next) {
  try {
    const { user_id, email, username, password, role } = req.body;

    if (!user_id || !email || !username || !role)
      throw new ErrorHandler(401, 'Invalid Information provided.');

    var conditions = {
      _id : user_id 
    }
 
    var update = {
      email,
      username,
      role
    }

    if (password)
      update.password = bcrypt.hashSync(password, 8);

    await User.findOneAndUpdate(conditions,update);

    res.status(200).send({ error: false, message: "User updated successfully!" });

  } catch (err) {
    next(err)
  }
};