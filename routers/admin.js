/*
 * @Author: Hinger36 
 * @Date: 2018-05-05 01:52:28 
 * @Last Modified by: Hinger36
 * @Last Modified time: 2018-05-09 18:47:18
 */
const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Category = require('../models/Category');

router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        res.send('<h1>对不起只有管理员才能进入后台<h1>');
        return;
    }
    next();
})

router.get('/', function (req, res) {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});
router.get('/user', function (req, res) {
    /**
     * 读取目前的用户数据
     * limit(Number) : 限制获取的数据条数
     * skip() : 忽略数据的条数
     * users : 所有的用户信息
     * count : 总查询页数
     * pages : 总页数
     * limit : 每页显示条数
     * page : 当前页
     */
    let page = Number(req.query.page || 1);
    let limit = 4;
    let skip = 0
    let pages = 0;
    User.count().then(function (count) {
        //计算页数
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users,
                count,
                pages,
                limit,
                page
            });
        }) ;
    });
});
/**分类首页 */
router.get('/category', function(req, res) {
    res.render('admin/category_index', {
        userInfo: req.userInfo
    });
});
  
/**分类添加 */
router.get('/category/add', function (req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    });
});

/**分类的保存 */
router.post('/category/add', function (req, res) {

});

module.exports = router;