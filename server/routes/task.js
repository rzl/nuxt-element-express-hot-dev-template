var express = require('express');
var router = express.Router();
var utils = require('../utils')
var services = require('../services')
/* GET home page. */
router.get('/config', async function(req, res, next) {
  var config = await services.config.getConfig()
    config.forEach((d) => {
      switch (d.key) {
        case 'workHour':
          d.value = parseInt(d.value);
          break;
        case 'defaultHoliday':
          d.value = JSON.parse(d.value);
          break;
      }
    })
    res.json({ code: 0, data: config, msg: '' })
});

router.put('/config', async function(req, res, next) {
  var data = req.body
  try {
    for (let x in data) {
      switch (x) {
        case 'workHour':
          await services.config.updateConfig('workHour', data[x])
          break;
        case 'defaultHoliday':
          await services.config.updateConfig('defaultHoliday', JSON.stringify(data[x]))
          break;
      }
    }
    res.json({ code: 0, data: null, msg: '保存成功' })
  } catch (e) {
    res.json({ code: 525, data: null, msg: e.message })
  }

});


router.get('/newTask', async function(req, res, next) {
  try {
    var result = await services.newTask.getList()
    res.json({ code: 0, data: result, msg: '获取新任务列表成功' })
  } catch (e) {
    res.json({ code: 525, data: null, msg: e.message })
  }

});

router.post('/newTask', async function(req, res, next) {
  var data = req.body
  try {
    var result = await services.newTask.add(req.body)
    res.json({ code: 0, data: result, msg: '创建新任务成功' })
  } catch (e) {
    res.json({ code: 525, data: null, msg: e.message })
  }
});

router.put('/newTask', async function(req, res, next) {
  var data = req.body
  try {
    var result = await services.newTask.update({ id: req.body.id, data: req.body })
    res.json({ code: 0, data: result, msg: '保存新任务成功' })
  } catch (e) {
    res.json({ code: 525, data: null, msg: e.message })
  }
});

router.delete('/newTask', async function(req, res, next) {
  try {
    var result = await services.newTask.deleteById({ id: req.query.id })
    res.json({ code: 0, data: result, msg: '删除新任务成功' })
  } catch (e) {
    res.json({ code: 525, data: null, msg: e.message })
  }
});

router.get('/newTaskLevel', async function(req, res, next) {
  try {
    var result = await services.config.getConfigByKey({key: 'newTaskLevel'})

    	res.json({ code: 0, data: result, msg: '获取新任务优先级成功' })
  } catch (e) {
    res.json({ code: 525, data: null, msg: e.message })
  }

});

router.post('/newTaskLevel', async function(req, res, next) {
  try {
    var result = await services.config.updateConfig('newTaskLevel', JSON.stringify(req.body))
    res.json({ code: 0, data: result, msg: '保存新任务优先级成功' })
  } catch (e) {
    res.json({ code: 525, data: null, msg: e.message })
  }

});


module.exports = router;
