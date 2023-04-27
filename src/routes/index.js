const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/about-me', (req, res) => {
    res.render('about-me');
})

module.exports = router;