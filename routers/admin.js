/*
 * @Author: Hinger36 
 * @Date: 2018-05-05 01:52:28 
 * @Last Modified by: Hinger36
 * @Last Modified time: 2018-05-05 01:55:03
 */
const express = require('express');
const router = express.Router();

router.get('/admin', function (req, res) {
    res.send('Time: '+new Date());
});

module.exports = router;