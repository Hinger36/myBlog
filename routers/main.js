/*
 * @Author: Hinger36 
 * @Date: 2018-05-05 01:52:16 
 * @Last Modified by:   Hinger36 
 * @Last Modified time: 2018-05-05 01:52:16 
 */
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        content:'hahahahah'
    });
});

module.exports = router;