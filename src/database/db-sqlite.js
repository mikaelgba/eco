//imp
const sqlite3 = require('sqlite3').verbose()

// criando o objeto que acessa o banco 
const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {

    const values_test = ["Irineu", 
    "https://d33wubrfki0l68.cloudfront.net/761b19ba1b78d95dd38a4500d63c8ba72ff2c5df/7b928/imagens/tsr_papel-01.jpg",
    "ABC", "DEF", "ACRE", "Rio Branco", "Lâmpadas"]

    const create_db = `CREATE TABLE IF NOT EXISTS Points (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        image TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT);`

    const insert_db = `INSERT INTO Points (name, 
        image, 
        address, 
        address2, 
        state, 
        city, 
        items) VALUES (?, ?, ?, ?, ?, ?, ?);`

    const select_db = `SELECT * FROM Points`
    const delete_db = `DELETE FROM Points WHERE id = ?`

    //create
    db.run(create_db)

    function after_insert(err){
        if(err) { 
            return console.log(err)
        }
        console.log("Cadastro com Sucesso")
        console.log(this)
    }
    //insert
    //db.run(insert_db, values_test, after_insert)

    //select 
    db.all(select_db, function(err, rows){
        if(err) { 
            return console.log(err)
        }
        console.log("Registros")
        console.log(rows)
    })

    //delete
    db.run(delete_db, [3], function(err){
        if(err) { 
            return console.log(err)
        }
        console.log("Registros deletado")
    })
    db.all(select_db, function(err, rows){
        if(err) { 
            return console.log(err)
        }
        console.log("Registros")
        console.log(rows)
    })
})