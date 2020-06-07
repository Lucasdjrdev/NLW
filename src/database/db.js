//cria banco de dados sqlite

//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

//fim da criação do sqlite

module.exports = db;

// utilizar o objeto de banco de dados, para nossas operações
/*db.serialize(() => {
    //Criar uma tabela
    db.run(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
      );
    `)

    //Inserir dados na tabela
    const query = `
      INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
      ) VALUES (?,?,?,?,?,?,?);
  `
    const values =  [
      "https://www.gnrambiental.com.br/noticias/wp-content/uploads/2019/02/alternativa_de_reciclagem_01.png",
      "Papersider",
      "Guilherme Gemballa, Jardim América",
      "Nº 260",
      "Santa Catarina",
      "Rio do Sul",
      "Resíduos Eletrônicos, Lâmpadas"
    ];

    function afterInsertData(err){
      if (err){
        return console.log(err)
      }

      console.log("Cadastrado com Sucesso");
      console.log(this);
    }
    db.run(query, values, afterInsertData);


    
    //Consultar dados na tabela
    db.all(`SELECT * FROM places`, function(err, rows){
      if (err){
        return console.log(err)
      }

      console.log ("Aqui estão seus registros");
      console.log (rows);

    });
    
    //deletar um dado da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [12], function(err){

      if (err){
        return console.log(err)
      }
      console.log ("Registro deletado com sucesso");
    });
});*/