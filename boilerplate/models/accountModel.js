const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ErrorHandler } = require('../helpers/error');


const { ObjectId } = Schema;
const accountSchema = new Schema({
  user: {
    type: ObjectId,
    unique: true,
    required: 'An account must be linked to a user',
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  biography: {
    type: String,
  },
  favourites: [{
    type: Schema.Types.Mixed,
    ref: 'Project',
  }],
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

accountSchema.statics.findById = function (id, cb) {
  let accountId;
  try {
    accountId = mongoose.Types.ObjectId(id);
  } catch (e) {
    throw new ErrorHandler(404, 'Account2 not found');
  }
  return this.model('Account').findOne({ _id: accountId }, cb);
};
accountSchema.statics.findByUserId = function (id, cb) {
  let userId;
  try {
    userId = mongoose.Types.ObjectId(id);
  } catch (e) {
    throw new ErrorHandler(404, 'Account not found');
  }
  return this.model('Account').findOne({ user: userId }, cb);
};
module.exports = mongoose.model('Account', accountSchema);

