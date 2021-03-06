/*
 * @Author: Hinger36 
 * @Date: 2018-05-05 01:52:52 
 * @Last Modified by: Hinger36
 * @Last Modified time: 2018-05-10 23:40:41
 */
//加载express模块
const express = require('express');
//加载swig模板引擎模块
const swig = require('swig');
//加载body-parser模块，他是一个HTTP请求体解析中间件
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const mongoose = require('mongoose');
const User = require('./models/User');
//创建app应用
const app = express();

//设置swig页面不缓存
swig.setDefaults({cache: false});
//定义模板引擎，使用swig.renderFile方法解析后缀为html的文件
app.engine('html', swig.renderFile);
//设置模板存放目录
app.set('views', './views');
//注册模板引擎
app.set('view engine', 'html');
//设置静态资源
app.use('/public', express.static(__dirname + '/public'));
//HTTP请求解析中间件,解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    //解析登录用户的cookies信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取当前 登录用户的类型 
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = userInfo.isAdmin;
               
                next();
            })
            // User.findById(req.userInfo._id, function (err, userInfo) {
            //     req.userInfo.isAdmin = userInfo.isAdmin;
            //     console.log(req.userInfo.isAdmin);
            // })
        } catch(e) {next();}
    } else {
        next();
    }
    
});

//路由
app.use('/', require('./routers/main'));
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));


mongoose.connect('mongodb://localhost/myblog', function (err) {
    if (err) {
        console.log('数据库链接失败');
    } else {
        console.log('数据库链接成功');
        app.listen(3000, function () {
            console.log('正在监听3000端口');
        });
    }
});
