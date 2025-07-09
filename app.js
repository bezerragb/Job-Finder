const express = require('express')
const app = express()
const db = require("./db/connection")

const port = 8080

app.listen(port, function() {
    console.log(`O express está rodando na porta ${port}`);
    
})

db
    .authenticate()
    .then(() => {
        console.log('Conectou ao banco de dados');
    })
    .catch(err => {
        console.log('Ocorreu um erro ao se conectar com o banco de dados', err);
        
    })

app.get('/', (req, res) => {
    res.send("Está funcionando 2")
})

