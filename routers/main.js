/*
 * @Author: Hinger36 
 * @Date: 2018-05-05 01:52:16 
 * @Last Modified by: Hinger36
 * @Last Modified time: 2018-05-07 19:48:00
 */
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        
        userInfo: req.userInfo,
        

    });
    //console.log(res);
});

module.exports = router;