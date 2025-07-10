const express = require('express')
const router = express.Router();
const job = require('../models/Job')

// rota criada para fazer teste via postman
router.get('/test', (req, res) => {
    res.send('deu certo')
})

router.post('/add', (req, res) => {
    let {title, salary, company, description, email, new_job} = req.body;

    job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err = console.log(err))
})

module.exports = router