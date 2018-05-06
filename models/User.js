/*
 * @Author: Hinger36 
 * @Date: 2018-05-05 20:30:15 
 * @Last Modified by: Hinger36
 * @Last Modified time: 2018-05-05 20:44:26
 */
const mongoose = require('mongoose');
const userSchema = require('../schemas/users');

module.exports = mongoose.model('User', userSchema);