const express = require('express');
// const { words } = require('lodash');
const logger = require('../logger/logger')
const date = require('../util/helper')
const month = require('../util/helper')
const batch = require('../util/helper')
const word = require('../validator/formatter')
    // const str = require('../logger/logger')
const router = express.Router();

router.get('/test-me', function(req, res) {
    logger.logging()

    date.currentDate()
    month.currentMonth()
    batch.batchInfo()

    word.lowerupper()
        // str.subArr()

    res.send('My first ever api!')
});

// router.get('/Hello', function(req, res) {
//     res.send('My 1st ever api assignment.')
// });

module.exports = router;
// adding this comment for no reason