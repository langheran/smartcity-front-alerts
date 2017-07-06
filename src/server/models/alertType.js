var config=require('../config.js');
var mongoose = config.mongooseConn;
var Schema = mongoose.Schema;
var AlertTypes = new Schema();
var AlertType = mongoose.model('alertTypes', AlertTypes, 'alertTypes');
module.exports = AlertType;
