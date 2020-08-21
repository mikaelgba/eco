/* "npm init -y"*/
/* "npm install express" - para instalar o express*/
/* "npm install nodemon" - monitora alteracoes no servidor*/
/* "npm install nunjuncks" - usado para deixar aplicacao mais dinamica*/
/* "npm start" no terminal inicia a conexao ao servidor, 
/* node src/database/db-sqçite.js - usado para testtar  o banco
claro, antes necessrio configurar isso no package.json*/

const express = require('express')
const server = express()

// importadndo o banco
const db = require('./database/db-sqlite')

// encontra o diretorio public para ser visivel para as rotas encontraem os arquivos css e as demais
server.use(express.static("public"))

// re.body
server.use(express.urlencoded({extended: true}))

// template engine
const nunjucks = new require("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// roots
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {

    console.log(req.body)

    const insert_db = `INSERT INTO Points (name, 
        image, 
        address, 
        address2, 
        state, 
        city, 
        items) VALUES (?, ?, ?, ?, ?, ?, ?);`

    const values = [ req.body.name, 
        req.body.image, 
        req.body.address, 
        req.body.address2, 
        req.body.state, 
        req.body.city, 
        req.body.itens ]

    function after_insert(err){

        if(err) { 
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastro com Sucesso")
        console.log(this)
        return res.render("create-point.html", {saved: true})
    }
    db.run(insert_db, values, after_insert)
})

server.get("/search", (req, res) => {

    const search_user = req.query.search
    const select_db = `SELECT * FROM Points WHERE city LIKE '%${search_user}%'`

    if(search_user == ""){
        return res.render("search-results.html", { total: 0 })
    }

    db.all(select_db, function(err, rows){

        if(err) { 
            return console.log(err)
        }
        
        console.log("Registros")
        console.log(rows)
        const total = rows.length
        return res.render("search-results.html", { places: rows, total })
    })
})

server.listen(3000)
