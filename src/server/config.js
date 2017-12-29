exports.mongoUrl="mongodb://alerts:Tecnologico2017@207.249.127.228:27018/orion";
var mongoose = require('mongoose');
mongoose.connect(exports.mongoUrl);
exports.mongooseConn=mongoose;
