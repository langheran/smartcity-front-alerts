exports.mongoUrl="mongodb://alerts:Tecnologico2017@35.164.147.79:27018/orion";
var mongoose = require('mongoose');
const mongooseOptions = { server: { auto_reconnect: true, poolSize: 100,
    socketOptions: {
      socketTimeoutMS: 60000000,
      keepAlive: true,
      reconnectTries: 60000000
    }}};

connectAll = function(){
// Create the database connection
  mongoose.connect(exports.mongoUrl, mongooseOptions);

// CONNECTION EVENTS
// When successfully connected
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + exports.mongoUrl);
    });

// If the connection throws an error
    mongoose.connection.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
      connectAll();
    });

// When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
      connectAll();
    });

// If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

    exports.mongooseConn=mongoose;
}

connectAll();
