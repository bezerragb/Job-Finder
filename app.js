const express = require('express')
const { engine }= require('express-handlebars')
const app = express()
const path = require('path')
const db = require("./db/connection")
const bodyParser = require('body-parser')

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
    res.render('index')
})

app.use('/jobs', require('./routes/jobs'))