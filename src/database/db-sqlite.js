//imp
const sqlite3 = require('sqlite3').verbose()

// criando o objeto que acessa o banco 
const db = new sqlite3.Database("./src/database/database.db")

// exportando o banco
module.exports = db

// apenas test
/*db.serialize(() => {

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
    db.run(insert_db, values_test, after_insert)

    //select 
    db.all(select_db, function(err, rows){
        if(err) { 
            return console.log(err)
        }
        console.log("Registros")
        console.log(rows)
    })

    //delete
    db.run(delete_db, [4], function(err){
        if(err) { 
            return console.log(err)
        }
        console.log("Registros deletado")
    })

    //select 
    db.all(select_db, function(err, rows){
        if(err) { 
            return console.log(err)
        }
        console.log("Registros")
        console.log(rows)
    })
})*/