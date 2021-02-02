var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../../config");
const User = require("../models/user.model");
const { ErrorHandler } = require('../../lib/errorHandler');
const { sendVerificationEmail, sendResetPasswordEmail} = require('../../lib/mailer');

exports.user_create = async function (req, res, next) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      throw new ErrorHandler(401, 'Invalid Information provided.');

    let findUser = await User.findOne({ email: email });
    if (findUser)
      throw new ErrorHandler(401, `The email address ${findUser.email} is already in use.`);

    let hashedPassword = bcrypt.hashSync(password, 8);
    let user = new User({
      email: email,
      username: username,
      password: hashedPassword
    });

    let saveUser = await user.save();
    if (!saveUser)
      throw new ErrorHandler(500, "Something went wrong please try again!");

    let verificationToken = await jwt.sign({ id: saveUser._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    await sendVerificationEmail({email, verificationToken});

    res.status(200).send({ error: false, message: `Verification email Sent to ${email}. This token will expire after 24 hours.`});

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
    
    if (!user.isVerified)
      throw new ErrorHandler(401, 'User is not verified!');

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ error: false, token: token, user: { username: user.username, email: user.email } });

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