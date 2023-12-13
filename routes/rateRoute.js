const express = require('express');
const router = require('express').Router();
const rateController = require('../controllers/rateController');

router.post("/addrate",rateController.addRate);
module.exports = router;