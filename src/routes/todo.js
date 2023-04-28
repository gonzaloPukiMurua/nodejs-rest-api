const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../../db');

router.get('/', async (req, res) => {
    const todo_list = await pool.query('SELECT * FROM todo_list');
    res.render('todo/list', {todo_list});
})

/*router.get('/add', (req, res) => {
    res.render('todo/add');
})*/

router.post('/add', async (req, res) => {
    console.log(req.body);
    const {title, description} = req.body;
    const form_data = {
        title,
        description
    };
    await pool.query('INSERT INTO todo_list SET ?', [form_data]);
    res.redirect('/todo');
})

module.exports = router;