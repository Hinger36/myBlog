//加载express模块
const express = require('express');
//加载模板引擎模块
const swig = require('swig');
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

app.get('/', function (req, res) {
    res.render('index')
})

app.listen(3000, function () {
    console.log('正在监听3000端口');
});