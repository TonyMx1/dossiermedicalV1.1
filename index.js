var express=require("express");
var path=require("path");
var session=require("express-session");
require("dotenv").config();
const bodyParser = require('body-parser');
const fs = require('fs');


var rutasUsuarios=require("./rutas/usuarios");

var app=express();
app.set("view engine", "ejs");
app.use("/web", express.static(path.join(__dirname, "/web")));
const dbPath = path.join(__dirname, 'data', 'products.json');
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRETO_SESSIONS,
    resave:true,
    saveUninitialized:true
}));

app.use("/",rutasUsuarios);


    app.listen(3000, ()=>{
    console.log('Servidor en http://localhost:3000:');
});