var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    'use strict';
    res.render('admin/index');
});

router.get('/login', function (req, res) {
    'use strict';
    res.render('admin/login');
});

module.exports = router;
