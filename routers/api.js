/*
 * @Author: Hinger36 
 * @Date: 2018-05-05 01:46:28 
 * @Last Modified by: Hinger36
 * @Last Modified time: 2018-05-08 00:52:06
 */
const express = require('express');
const router = express.Router();
const User = require('../models/User');

let responseData = {
    code: 0,
    message: ''
}

router.post('/user/register', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
    //用户输入是否为空
    if (!username) {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (!password) {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    //两次密码输入是否一致
    if (password !== repassword) {
        responseData.code = 3;
        responseData.message = '两次密码输入不一致';
        res.json(responseData);
        return;
    }
    //用户名是否被注册
    User.findOne({
        username: username
    }).then(function (info) {
        if (info) {
            responseData.code = 4;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        let user = new User({
            username: username,
            password: password
        });
        user.save();
        responseData.code = 0;
        responseData.message = '注册成功';
        res.json(responseData);
    });
});

router.post('/user/login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    //用户输入是否为空
    if (!username) {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (!password) {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    User.findOne({
        username: username,
        password: password
    }).then(function (info) {
        if (!info) {
            responseData.code = 3;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        responseData.code = 0;
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id: info.id,
            username: info.username
        }
        req.cookies.set('userInfo', JSON.stringify(
            responseData.userInfo
        ));
        res.json(responseData); 
        
    });
   
});
//退出
router.get('/user/signout', function (req, res) {
    req.cookies.set('userInfo', null);
    res.redirect(302, '/');
})

module.exports = router;