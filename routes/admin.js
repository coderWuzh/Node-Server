var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//删除管理员/api/admin/deleteAdmin
router.post('/api/admin/deleteAdmin', function (req, res, next) {
  let admin_id = req.body.admin_id
  connection.query(`delete from admin where id = ${admin_id}`, (error, results) => {
      res.send({
        data: {
          code: 200,
          success: true
        }
      });
  })
});
//编辑管理员数据
router.post('/api/admin/editAdmin', function (req, res, next) {
  let formData = JSON.parse(req.body.form)
  let admin_id = req.body.admin_id
  connection.query(`select * from goods_list where id = ${admin_id}`, (error, results) => {
    if (results.length > 0) {
      connection.query(`update admin set admin_name = '${formData.admin_name}',password = '${formData.password}',authority = '${formData.authority}' where id = ${admin_id}`, (err, result) => {
        res.send({
          data: {
            code: 200,
            success: true
          }
        });
      })
    }
  })
});

//新增管理员数据
router.post('/api/admin/addAdmin', function (req, res, next) {
  let formData = JSON.parse(req.body.form)
  connection.query(`INSERT INTO admin (admin_name,password,authority) VALUES(${formData.admin_name},'${formData.password}','${formData.authority}')`, (error, results) => {
      res.send({
        data: {
          code: 200,
          success: true
        }
      });
  })
});

//获取管理员列表
router.get('/api/admin/getData', function (req, res, next) {
  connection.query(`select * from admin`, (error, results) => {
    res.send({
      data: {
        code: 200,
        success: true,
        data: results
      }
    });
  })
});

//登录验证
router.post('/api/login', function (req, res, next) {
  let params = {
    adminName: req.body.adminName,
    adminPwd: req.body.adminPwd,
  }
  connection.query(`select * from admin where admin_name = '${params.adminName}'`, (error, results) => {
    if(results.length>0){
      connection.query(`select * from admin where admin_name = '${params.adminName}' and password = '${params.adminPwd}'`, (error, result) => {
    if(result.length>0){
      res.send({
          data: {
            code: 200,
            success: true,
            data: results[0]
          }
      });
      }else{
        res.send({
          data: {
            code: 400,
            success: false,
            msg:'密码错误'
          }
        });
      }
    })
    }else{
      res.send({
        data: {
          code: 400,
          success: false,
          msg:'用户名错误'
        }
      });
    }
  })
});

//新增订单数据
router.post('/api/order/insertData', function (req, res, next) {
  let formData = JSON.parse(req.body.form)
  connection.query(`INSERT INTO store_order (id,uId,order_id,goods_name,goods_price,goods_num,order_status) VALUES(${formData.id},${formData.uId},'${formData.order_id}','${formData.goods_name}','${formData.goods_price}','${formData.goods_num}','${formData.order_status}')`, (error, results) => {
      res.send({
        data: {
          code: 200,
          success: true
        }
      });
  })
});

//删除订单数据
router.post('/api/order/deleteData', function (req, res, next) {
  let id = req.body.id
  connection.query(`delete from store_order where id = ${id}`, (error, results) => {
      res.send({
        data: {
          code: 200,
          success: true
        }
      });
  })
});

//编辑订单数据
router.post('/api/order/editData', function (req, res, next) {
  let formData = JSON.parse(req.body.form)
  connection.query(`select * from store_order where id = ${formData.id}`, (error, results) => {
    if (results.length > 0) {
      connection.query(`update store_order set id = ${formData.id},uId = ${formData.uId},order_id = '${formData.order_id}',goods_name = '${formData.goods_name}',goods_price = '${formData.goods_price}',goods_num = '${formData.goods_num}',order_status = '${formData.order_status}' where id = ${formData.id}`, (err, result) => {
        res.send({
          data: {
            code: 200,
            success: true
          }
        });
      })
    }
  })
});
//获取订单数据
router.get('/api/order/getData', function (req, res, next) {
  connection.query(`select * from store_order`, (error, results) => {
    res.send({
      data: {
        code: 200,
        success: true,
        data: results
      }
    });
  })
});


//新增商品数据
router.post('/api/goods/insertData', function (req, res, next) {
  let formData = JSON.parse(req.body.form)
  connection.query(`INSERT INTO goods_list (goods_id,NAME,price,num,imgUrl) VALUES(${formData.id},'${formData.name}',${formData.price},${formData.num},'${formData.imgUrl}')`, (error, results) => {
      res.send({
        data: {
          code: 200,
          success: true
        }
      });
  })
});

//删除商品数据
router.post('/api/goods/deleteData', function (req, res, next) {
  let goods_id = req.body.goods_id
  connection.query(`delete from goods_list where goods_id = ${goods_id}`, (error, results) => {
      res.send({
        data: {
          code: 200,
          success: true
        }
      });
  })
});

//编辑商品数据
router.post('/api/goods/editData', function (req, res, next) {
  let formData = JSON.parse(req.body.form)
  connection.query(`select * from goods_list where goods_id = ${formData.goods_id}`, (error, results) => {
    if (results.length > 0) {
      connection.query(`update goods_list set goods_id = ${formData.goods_id},name = '${formData.name}',price = ${formData.price},num = ${formData.num},imgUrl = '${formData.imgUrl}' where goods_id = ${formData.goods_id}`, (err, result) => {
        res.send({
          data: {
            code: 200,
            success: true
          }
        });
      })
    }
  })
});
//获取商品数据
router.get('/api/goods/getData', function (req, res, next) {
  connection.query(`select * from goods_list`, (error, results) => {
    res.send({
      data: {
        code: 200,
        success: true,
        data: results
      }
    });
  })
});


module.exports = router;
