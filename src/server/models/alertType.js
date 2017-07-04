var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/entities');
var Schema = mongoose.Schema;
var AlertTypes = new Schema();
var AlertType = mongoose.model('alertTypes', AlertTypes, 'alertTypes');
module.exports = AlertType;
