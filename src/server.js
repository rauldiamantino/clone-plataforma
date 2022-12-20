const express = require("express"); // call to express
const app = express(); // express instance

app.set("view engine", "ejs"); // talks to the express how to open the archive html
app.use(express.static("public"));

app.get("/", function (req, res) {
     res.render("pages/index");
}); //create a route

app.get("/mais-vendidos", function (req, res) {
     res.render("pages/mais-vendidos");
});

app.get("/lancamentos", function (req, res) {
     res.render("pages/lancamentos");
});

app.get("/colecoes", function (req, res) {
     res.render("pages/colecoes");
});

app.listen(8080); //charge all the express
console.log("Server ON");
