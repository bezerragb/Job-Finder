const express = require('express')
const { engine }= require('express-handlebars')
const app = express()
const path = require('path')
const db = require("./db/connection")
const job = require("./models/Job")
const bodyParser = require('body-parser')
const Sequelize  = require('sequelize')
const Op = Sequelize.Op

const port = 8080

app.listen(port, function() {
    console.log(`O express está rodando na porta ${port}`);
    
})

app.use(bodyParser.urlencoded({extended: false}) )
app.set('views', path.join(__dirname,'/views'))
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')))

db
    .authenticate()
    .then(() => {
        console.log('Conectou ao banco de dados');
    })
    .catch((err) => {
        console.log('Erro ao conectar ao banco', err);
    })
       
app.get('/', (req, res) => {

    let search = req.query.job
    let query = '%'+search+'%'
    if(!search){
        job.findAll({order: [['createdAt', 'DESC']]
        })
        .then(jobs => {
            res.render('index', {
                jobs
            })
        })
        .catch(err => console.log(err))
    }else{    
        job.findAll({
            where: {title: {[Op.like]: query}},
            order: [['createdAt', 'DESC']]
        })
        .then(jobs => {
            res.render('index', {
                jobs, search
            })
        })
    }

})

app.use('/jobs', require('./routes/jobs'))