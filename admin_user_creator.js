var bcrypt = require("bcryptjs");
const User = require("./api/models/user.model");
const inquirer = require('inquirer');
var config = require("./config");

// Set up mongoose connection
const mongoose = require("mongoose");
let dev_db_url = config.dev_mongo_uri;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var questions = [
  {
    type: 'input',
    name: 'email',
    message: "Enter admin email"
  },
  {
    type: 'password',
    name: 'password',
    message: "Enter admin password"
  },
]

inquirer.prompt(questions).then(async(answers) => {
    let hashedPassword = bcrypt.hashSync(answers['password'], 8);
    let user = new User({
      email: answers['email'],
      username: 'admin',
      password: hashedPassword,
      role: "admin" 
    });

    await user.save();

    console.log(`Admin user created`)
}).catch(error => {
    console.log(error)
})