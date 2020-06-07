const express = require('express');
const router = express.Router();
const controller = require('./event.controller')

router.get('/audit', controller.getAudit);
router.post('/audit', controller.postAudit);

router.get('/writer', controller.getWriter);
router.post('/writer', controller.postWriter);

router.get('/query', controller.getQuery);
router.post('/query', controller.postQuery);

router.get('/', controller.get);
router.get('/dashboard', controller.dashboard);
router.post('/upload/:id', controller.upload);
router.put('/action/:type/:id', controller.action);

module.exports = router;
