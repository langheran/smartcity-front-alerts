var config=require('../config.js');
var mongoose = config.mongooseConn;
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
  user         : String,
  message      : String,
  key          : String
});
var Message = mongoose.model('Message',
  MessageSchema);
module.exports = Message;
