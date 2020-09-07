const mongoose = require('mongoose');

const { Schema } = mongoose;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

UserSchema.methods.validPassword = function validPassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = () => {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 120);

  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      exp: parseInt(expiry.getTime() / 1000, 10),
    },
    process.env.DANIK_AUTH_KEY,
  );

  return { token, expiry };
};

module.exports = mongoose.model('User', UserSchema);
