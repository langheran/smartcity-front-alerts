var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/entities');
var Schema = mongoose.Schema;
var AlertTypes = new Schema();
AlertTypes.on('init', function (model) {
  // do stuff with the model
});
var AlertType = mongoose.model('alertTypes', AlertTypes, 'alertTypes');
module.exports = AlertType;
