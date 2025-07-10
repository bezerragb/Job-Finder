const express = require('express')
const app = express()
const db = require("./db/connection")
const bodyParser = require('body-parser')

const port = 8080

app.listen(port, function() {
    console.log(`O express está rodando na porta ${port}`);
    
})

app.use(bodyParser.urlencoded({extended: false}) )

db
    .authenticate()
    .then(() => {
        console.log('Conectou ao banco de dados');
    })
    .catch((err) => {
        console.log('Erro ao conectar ao banco', err);
    })
       
app.get('/', (req, res) => {
    res.send("Está funcionando 2")
})

app.use('/jobs', require('./routes/jobs'))