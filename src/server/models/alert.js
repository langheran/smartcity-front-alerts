var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/entities');
var Schema = mongoose.Schema;
var alertSchema = new Schema();
var Alert = mongoose.model('Alert',
  alertSchema);
module.exports = Alert;
