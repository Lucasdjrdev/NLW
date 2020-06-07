//criação de servidor em 3 linhas de codigo

//faz o require do expressa e a resposta é armazenada na const express.
const express = require("express");

//objeto do servidor que recebe a função retornada pra variavel express.
const server = express();

//pega o banco de dados sql
const db = require("./database/db.js");

//fim da criação do servidor + server.listen(3000)

//configurar pasta publica
server.use(express.static("public"));

//Habilitar o uso do req.body para metodo Post
server.use(express.urlencoded({extended: true}));



//////////////// UTILIZANDO TEMPLATE ENGINE ///////////////////

const nunjucks = require ("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true

});










/////////////////////////////////////////////////////////////



//configurar caminhos da minha aplicação (rotas)
//pagina inicial
server.get("/", (req, res) => {
  //envia a pagina index como pagina inicial do servidor
  //utiliza o render para a req/res passar pelo motor do nunjucks
  return res.render("index.html", {title: "hello" });
});


//criação de rota para página create-point
server.get("/create-point", (req, res) => {
  //req.query: Query strings da Url
  //utiliza o render para a req/res passar pelo motor do nunjucks
  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {

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
  req.body.image,
  req.body.name,
  req.body.address,
  req.body.address2,
  req.body.state,
  req.body.city,
  req.body.items
];

function afterInsertData(err){
  if (err){
      console.log(err)
      return res.send("Erro no Cadastro");
  }

  console.log("Cadastrado com Sucesso");
  console.log(this);


  
  return res.render("create-point.html", {saved: true});

}
db.run(query, values, afterInsertData);


});




//criação de roda para página search-results 
server.get("/search", (req, res) => {

  const search = req.query.search;

  if (search == ""){
    return res.render("search-results.html", {total: 0});
  }



  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){

    if (err){
      return console.log(err);
    }

    const total = rows.length;
    //mostrar a pagina html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total });

  });
  

})

//liga o servidor na página 3000.
server.listen(5500);

//////////////////////////////////////////////////////////////

//TEMBPLATE ENGINE