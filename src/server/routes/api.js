const express =
  require('express');
const router = express.Router();

router.use(function (req, res, next) {
  // https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/', function (req, res) {
  res.send('api works');
});

router.get('/alerts/:alertTypeName', function (req, res) {
  console.log("reading");
  var Alert = require('../models/alert');
  Alert.find({alertTypeName: req.params.alertTypeName}, function (err, alerts) {
    if (err) {
      res.status(500).send(err);
      throw err;
    }
    if (alerts.length) {
      res.status(200).json(alerts);
    } else {
      console.log("empty");
      res.status(202).end();
    }
  });
});

router.get('/alertTypes', function (req, res) {
  var AlertType = require('../models/alertType');
  AlertType.find({}, function (err, alerts) {
    if (err) {
      res.status(500).send(err);
      throw err;
    }
    if (alerts.length) {
      res.status(200).json(alerts);
    } else {
      console.log("empty");
      res.status(202).end();
    }
  });
});

router.post('/messages', function (req, res) {
  var Message = require('../models/message');
  var message = new Message(req.body);
  message.save(function (err, createdMessageObject) {
    if (err) {
      res.status(500).send(err);
    }
    // This createdTodoObject is the same one we saved, but after Mongo
    // added its additional properties like _id.
    res.status(200).send(createdMessageObject);
  });
});

router.get('/messages/:msg', function (req, res) {
  var Message = require('../models/message');
  Message.find({message: req.params.msg, user: req.query.user}, function (err, alerts) {
    if (err) {
      res.status(500).send(err);
      throw err;
    }
    if (alerts.length) {
      res.status(200).json(alerts);
    } else {
      console.log("empty");
      res.status(202).end();
    }
  });
});

module.exports = router;
