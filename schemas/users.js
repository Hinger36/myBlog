/*
 * @Author: Hinger36 
 * @Date: 2018-05-05 20:33:02 
 * @Last Modified by: Hinger36
 * @Last Modified time: 2018-05-08 13:48:33
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//用户表结构
module.exports = new Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default:false
    }
});