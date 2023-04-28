const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../../db');

router.get('/', async (req, res) => {
    const todo_list = await pool.query('SELECT * FROM todo_list WHERE done = 0;');
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
});

router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    console.log(`Id: ${id}`);
    const done = true;
    await pool.query('UPDATE todo_list SET done = ? WHERE id = ?', [done, id]);
    res.redirect('/todo');
});

router.get('/edit/:id', async (req, res) => {    
    const {id} = req.params;    
    console.log(id);
    const edit_item = await pool.query('SELECT * FROM todo_list WHERE id = ?;', [id]);
    res.render('todo/edit', {todo_list: edit_item[0]});
})

router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    console.log(`ID: ${id}`);
    console.log(req.body);
    const {title, description} = req.body;
    const form_data = {
        title,
        description
    };
    await pool.query('UPDATE todo_list SET ? WHERE Id = ?', [form_data, id]);
    res.redirect('/todo');
})

module.exports = router;