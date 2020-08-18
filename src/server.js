/* "npm init -y"*/
/* "npm install express" - para instalar o express*/
/* "npm install nodemon" - monitora alteracoes no servidor*/
/* "npm install nunjuncks" - usado para deixar aplicacao mais dinamica*/
/* "npm start" no terminal inicia a conexao ao servidor, 
claro, antes necessrio configurar isso no package.json*/

const express = require('express')
const server = express()

//encontra o diretorio public para ser visivel para as rotas encontraem os arquivos css e as demais
server.use(express.static("public"))

// template engine
const nunjucks = new require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//roots
server.get("/", (req, res) => {
    return res.render("index.html")
})
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

server.listen(3000)
