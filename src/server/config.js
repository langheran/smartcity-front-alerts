exports.mongoUrl="mongodb://langheran:Tec2017@207.249.127.228/entities";
var mongoose = require('mongoose');
mongoose.connect(exports.mongoUrl);
exports.mongooseConn=mongoose;
