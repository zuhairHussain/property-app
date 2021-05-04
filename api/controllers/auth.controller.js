var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../../config");
const User = require("../models/user.model");
const { ErrorHandler } = require('../../lib/errorHandler');

exports.user_create = async function (req, res, next) {
  try {
    const { email, username, password, role } = req.body;

    if (!email || !username || !password || !role)
      throw new ErrorHandler(401, 'Invalid Information provided.');

    let findUser = await User.findOne({ email: email });
    if (findUser)
      throw new ErrorHandler(401, `The email address ${findUser.email} is already in use.`);

    let hashedPassword = bcrypt.hashSync(password, 8);
    let user = new User({
      email: email,
      username: username,
      password: hashedPassword,
      role: role || "basic" 
    });

    let saveUser = await user.save();
    if (!saveUser)
      throw new ErrorHandler(500, "Something went wrong please try again!");

    let accessToken = await jwt.sign({ id: saveUser._id, role: role || "basic"  }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    user.accessToken = accessToken;

    res.status(200).send({ error: false, accessToken});

    next();
  } catch (err) {
    next(err)
  }
};

exports.verify_email = async function (req, res, next) {
  try {
    const { token } = req.query;
    let userInfo;

    if (!token)
      res.status(401).redirect("/login?message=Email is not verified!");

    try {
      userInfo = await jwt.verify(token, config.secret);
    } catch(err) {
        res.status(401).redirect("/login?message=Email is not verified!");
    }

    await User.findOneAndUpdate(
      { _id: userInfo.id },
      { $set: { isVerified: true } },
      { new: true }
    ).then(doc => {
      if (doc) {
        res.redirect("/login?message=Email verified successfully!");
      } else {
        res.status(401).redirect("/login?message=Email is not verified!");
      }
    });

    next();
  } catch (err) {
    next(err)
  }
};

exports.user_login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new ErrorHandler(401, 'Email and Password are required!');

    let user = await User.findOne({ email: email });
    if (!user)
      throw new ErrorHandler(401, 'User not found.');

    var passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid)
      throw new ErrorHandler(401, 'Invalid email or password!');

    var accessToken = jwt.sign({ id: user._id, role: user.role }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    await User.findByIdAndUpdate(user._id, { accessToken });

    res.status(200).send({ error: false, token: accessToken, user: { username: user.username, email: user.email, role: user.role } });

    next();
  } catch (err) {
    next(err)
  }
};

exports.reset_password_request = async function (req, res, next) {
  try {
    const { email } = req.body;
    let user;

    if (!email)
      throw new ErrorHandler(401, 'Please provide email address!');

    await User.findOne({ email: email }).then(userData => {
      if(!userData || !userData.isVerified){
        throw new ErrorHandler(401, 'No user found!');
      }
      user = userData;
    });

    let token = await jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    await sendResetPasswordEmail({email, token});

    res.status(200).send({ error: false, message: `Verification email Sent to ${user.email}` });

    next();
  } catch (err) {
    next(err)
  }
};

exports.reset_password = function (req, res, next) {

  const { token, newPassword } = req.body;
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  if (!newPassword)
    return res.status(401).send({ auth: false, message: "No password provided." });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate." });

    var hashedPassword = bcrypt.hashSync(newPassword, 8);
    User.findOneAndUpdate(
      { _id: decoded.id },
      { $set: { password: hashedPassword } },
      { new: true }
    ).then(doc => {
      if (doc) {
        res.status(200).send({ message: "Password has been updated!" });
      } else {
        res.status(200).send({ error: "User not found!" });
      }
    });

  });
};