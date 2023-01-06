const express = require("express"); // call to express
const app = express(); // express instance

app.set("view engine", "ejs"); // talks to the express how to open the archive html
app.use(express.static("public"));

app.get("/", function (req, res) {
     res.render("pages/index");
}); //create a route

app.get("/lancamentos", function (req, res) {
     res.render("pages/lancamentos");
});

app.get("/sale", function (req, res) {
     res.render("pages/sale");
});

app.get("/login", function (req, res) {
     res.render("pages/login");
});

app.get("/cadastro", function (req, res) {
     res.render("pages/cadastro");
});

app.get("/sobre", function (req, res) {
     res.render("pages/sobre");
});

app.get("/duvidas", function (req, res) {
     res.render("pages/duvidas");
});

app.get("/contato", function (req, res) {
     res.render("pages/contato");
});

app.get("/calcados", function (req, res) {
     res.render("pages/calcados/calcados");
});

app.get("/calcados/masculino", function (req, res) {
     res.render("pages/calcados/masculino");
});

app.get("/calcados/feminino", function (req, res) {
     res.render("pages/calcados/feminino");
});

app.get("/carrinho", function (req, res) {
     res.render("pages/carrinho");
});

app.listen(8080); //charge all the express
console.log("Server ON");
