var config=require('../config.js');
var mongoose = config.mongooseConn;
var Schema = mongoose.Schema;
var alertSchema = new Schema();
var Alert = mongoose.model('Alert',
  alertSchema);
module.exports = Alert;
