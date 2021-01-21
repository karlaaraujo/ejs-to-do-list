const express = require("express");
const bodyParser = require("body-parser");
const data = require(__dirname + "/data.ejs");

const app = express();

app.set("view engine", "ejs"); //this line of code tells the app to use ejs as its view engine

app.use(bodyParser.urlencoded({extended:true})); //this configures the app to use the bodyparser
app.use(express.static("public")); //telling express to serve the public folder, which contains the css, as a static file

let itens=[];
let itensTrabalho=[];

app.get("/", function(req, res)
{
  let dia = data.getDate(); //associando a função () da file data(.ejs) à variavel dia
  res.render("list",{tituloLista:dia, novosItensDaLista: itens}); // this says: render the file called list (that has an extension of .ejs and is inside a views folder)
                                                                  // and send that file an object {} passing in two variables: tituloLista (dia) and novosItensDaLista (item)

});
app.post("/", function(req, res){

  console.log(req.body);

  let item=req.body.novoItem;

  if (req.body.botao === "Work"){ //esse escopo serve para checar a lista em que o item foi adicionado tomando como dado o attr value do botão (data na / e "Work" na /work) a fim de add o item na lista correspondente.
    itensTrabalho.push(item);
    res.redirect("/work");
  } else{
    itens.push(item);
    res.redirect("/"); //this redirects the page to the root route, it goes through the app.get again and this time, because the variable was set, it adds the new item.

  }
});

app.get("/work", function(req, res){ //rota da Work List
  res.render("list",{tituloLista:"Work List", novosItensDaLista: itensTrabalho});
});

app.get("/sobre", function(req,res){
  res.render("sobre");
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
