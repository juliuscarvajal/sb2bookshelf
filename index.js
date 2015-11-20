var _ = require('lodash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

app.use('/api/v0', router);
app.listen(3000, function() {
  console.log('API server up...');
});

/////////////////// models

var models = require('./models')();

///////////////// routes

router.route('/')
.get(function(req, res) {
  res.json({
    status: 'ok'
  });
});

router.route('/locations')
.get(function(req, res) {
  models.Location.fetchAll({
    withRelated: [ {
      'channels' : function(qb) {
        qb.columns('channel.id');
      }
    } ]
  }).then(function(data) {
    res.json(data.toJSON({omitPivot: true}));
  }).catch(function(err) {
    console.log(err);
  });
});

router.route('/channels')
.get(function(req, res) {
  models.Channel.fetchAll({
    withRelated: [ {
      'locations' : function(qb) {
        qb.columns('location.id');
      }
    } ]
  }).then(function(data) {
    res.json(data.toJSON({omitPivot: true}));
  }).catch(function(err) {
    console.log(err);
  });
});

router.route('/assets')
.get(function(req, res) {
  models.Content.fetchAll().then(function(data) {
    res.json(data.toJSON());
  });
});
