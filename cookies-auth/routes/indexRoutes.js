var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var username = 'blah';
var password = 'blah';

var adminName = 'booga';
var adminPass = 'booga';

var data = [{
  key: "value pair"
}]

function checkAuth(req, res, next) {
  if (req.cookies.authed) {
    next();
  } else {
    res.status(400).send('Gandalfed yo ass!')
  }
}

function checkAdmin(req, res, next) {
  if (req.cookies.admin) {
    next();
  } else {
    res.status(400).send('Gandalfed yo ass!')
  }
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/login', function(req, res) {
  if (req.body.username === username && req.body.password === password) {
    res.cookie('authed', true);
    res.redirect('/user');
  } else if (req.body.username === adminName && req.body.password === adminPass) {
    res.cookie('admin', true);
    res.redirect('admin');
  }
})

router.get('/user', checkAuth, function(req, res) {
  res.render('user');
})

router.get('/add', checkAuth, function(req, res) {
  res.render('add', {
    data
  });
})

router.get('/admin', checkAdmin, function(req, res) {
  res.render('admin', {
    adminName
  });
})

router.get('/edit', checkAdmin, function(req, res) {
  res.render('edit');
})

router.get('/delete', checkAdmin, function(req, res) {
  res.render('delete');
})

module.exports = router;
