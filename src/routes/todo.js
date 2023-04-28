const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require(path.resolve(__dirname), 'db');

router.get('/', async (req, res) => {
    const todo_list = await pool.get('SELECT * FROM todo_list');
    res.render('todo/list', {todo_list});
})

router.get('/add', (req, res) => {
    res.render('todo/add');
})

router.post('/add', (req, res) => {
    const {title, description} = req.body;
    const form_data = {
        title,
        description
    };
    pool.query('INSERT INTO todo_list (title, description) SET ?', [form_data]);
    res.redirect('/todo');
})

module.exports = router;