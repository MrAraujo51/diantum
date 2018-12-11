/**
 * @author: Manuel Araujo 
 * @date: 2017-08-03 13:04:51 
 */

const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcryptjs'); // A native JS bcrypt library for NodeJS
const crypto = require('crypto')

/**
 * Help function that determines whether the e-mail length 
 * is greater than 5 and less than 30
 * 
 * @param {string} email - user email
 * @returns {boolean} @code true if e-mail length is valid
 * {@code false} if the email is invalid or not exist
 */
let emailLengthChecker = (email) => {
    // Check if e-mail exists
    if (!email) return false; // Return error

    // Check the length of e-mail string
    if (email.length < 5 || email.length > 45) return false; // Return error if not within proper length
        
    return true; // Return as valid e-mail
};

/**
 * Help function that determines if the e-mail format is valid
 * 
 * @param {string} email - user email
 * @returns {boolean} 
 * @code true | if a valid e-mail format
 * @code false | if e-mail format is ivalid or e-mail not exist
 */
let validEmailChecker = (email) => {
    // Check if e-mail exists
    if (!email) return false; // Return error
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email); // Return regular expression test results (true or false)
};

/**
 * Array of Email Validators
 * 
 * @constant 
 */
const emailValidators = [
  // First Email Validator
  {
    validator: emailLengthChecker,
    message: 'E-mail must be at least 5 characters but no more than 30'
  },
  // Second Email Validator
  {
    validator: validEmailChecker,
    message: 'Must be a valid e-mail'
  }
];

/**
 * Help function that determines whether the username length 
 * is greater than 5 and less than 15
 * 
 * @param {string} username 
 * @returns {boolean} 
 * @code true | if valid username 
 * @code false | if invalid username
 */

let usernameLengthChecker = (username) => {
  // Check if username exists
  if (!username) {
    return false; // Return error
  } else {
    // Check length of username string
    if (username.length < 5 || username.length > 15) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};

/**
 * Help function that determines if the username format is valid
 * 
 * @param {string} username 
 * @returns {boolean}
 * @code true | if valid username 
 * @code false | if invalid username
 */
let validUsername = (username) => {
  // Check if username exists
  if (!username) {
    return false; // Return error
  } else {
    // Regular expression to test if username format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username); // Return regular expression test result (true or false)
  }
};

/**
 * Array of Username validators
 * 
 * @constant
 */
const usernameValidators = [
  // First Username validator
  {
    validator: usernameLengthChecker,
    message: 'Username must be at least 5 characters but no more than 15'
  },
  // Second username validator
  {
    validator: validUsername,
    message: 'Username must not have any special characters'
  }
];


/**
 * Help function that determines whether the username length 
 * is greater than 8 and less than 35
 * 
 * @param {string} password - password user
 * @returns {boolean}
 * @code true | if the password length is valid
 * @code false | if the password length is invalid  
 */

let passwordLengthChecker = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 35) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};


/**
 * Help function that determines if the password format is valid
 * 
 * @param {string} password - pasword user
 * @returns {boolean}
 * @code true | if the password format is valid
 * @code false | if the pasword format is invalid
 */

let validPassword = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Regular Expression to test if password is valid format
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password); // Return regular expression test result (true or false)
  }
};

/**
 * Array of Password validators
 * @constant
 */
const passwordValidators = [
  // First password validator
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },
  // Second password validator
  {
    validator: validPassword,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
  }
];

/**
 * User Model Definition
 * 
 * @constant
 */
const userSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      validate: emailValidators
  },
  username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: usernameValidators
  },
  password: {
      type: String,
  },
  signupDate: {
    type: String,
    default: Date.now()
  },
  lastLogin: Date,
  isVerified: {
    type: Boolean,
    default: false
  },
  gravatar: String
    

});

/**
 * Schema Middleware to Encrypt Password
 */
// userSchema.pre('save', function(next){
//   let user = this;
//   // Ensure password is new or modified before applying encryption
//   if (!this.isModified("password"))
//     return next();

//   // Apply encryption
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err)

//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if (err) return next(err)

//       this.password = hash
//       next()
//     })
//   })
// });

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};

// Methods to generate a random gravatar
userSchema.pre('save', (next) => {
  if (!this.email) {
    this.gravatar =`https://gravatar.com/avatar/?s=200&d=retro`
    return next();
  }

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  this.gravatar = `https://gravatar.com/avatar/${md5}?s=200&d=retro`
  next();
})

const User = module.exports = mongoose.model('User', userSchema);

