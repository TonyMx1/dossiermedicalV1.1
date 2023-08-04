var rutas=require("express").Router();
const fs = require('fs');

function readProductsFromDB() {
    let dbPath = "./web/data/products.json"
    var data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

function readProductsFromDB() {
    let dbPath = "./web/data/users.json"
    var data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

const dbPath = './web/data/users.json';
function readUsersFromDB() {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

rutas.get("/",(req,res)=>{
    res.render("index");
})

rutas.get("/contacto",(req,res)=>{
    res.render("contacto");
})

rutas.get("/inicio",(req,res)=>{
    res.render("inicio");
})

rutas.get("/contactanos",(req,res)=>{
    res.send("Contactanos");
});

rutas.get("/accederAdmin",(req,res)=>{
    res.render("accederAdmin");
});

rutas.post("/acceder", (req, res)=>{
    if(req.body.usuario=="administrador" && req.body.password=="admin"){
        req.session.usuario=req.body.usuario;
        res.redirect("/listmed");
    }
    else{
        res.redirect("/error");
    }
});

rutas.get("/bienvenido",(req,res)=>{
    res.render("bienvenido");
})

rutas.get("/error",(req,res)=>{
    res.render("error");
})

rutas.get("/accederMedico",(req,res)=>{
    res.render("accederMedico");
})

rutas.get("/accederPaciente",(req,res)=>{
    res.render("accederPaciente");
});

rutas.get('/sesion', (req, res) => {
    res.render("sesion");
});

rutas.get('/registrar', (req, res) => {
    res.render('registrar');
});


rutas.post('/registrar', (req, res) => {
    const { fullName, specialty, email, password } = req.body;
    const newUser = { fullName, specialty, email, password };


    let users = [];
    if (fs.existsSync('users.json')) {
      const usersData = fs.readFileSync('users.json');
      users = JSON.parse(usersData);
    }
  
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      res.send('El usuario ya existe');
      return;
    }
  
    users.push(newUser);
  
    fs.writeFileSync('users.json', JSON.stringify(users));
  
    res.redirect('/sesion');
  });
  
  
rutas.get('/sesion', (req, res) => {
    res.render('sesion');
  });
  
  
  rutas.post('/sesion', (req, res) => {
    const { email, password } = req.body;
  
    
    const usersData = fs.readFileSync('users.json');
    const users = JSON.parse(usersData);
  
    
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
      res.send('Credenciales inválidas');
      return;
    }
  
    res.render('perfil', { user });
  });


function saveProductsToDB(products) {
    fs.writeFileSync(dbPath, JSON.stringify(products, null, 4), 'utf8');
}


rutas.get('/pacientes', (req, res) => {
    const products = readProductsFromDB();
    res.render('pacientes', { products });
});


rutas.get('/add', (req, res) => {
    res.render('add_product');
});


rutas.post('/add', (req, res) => {
    const products = readProductsFromDB();
    const newProduct = {
        id: Date.now(),
        nombre: req.body.nombre,
        precio: parseFloat(req.body.precio),
        fecha: req.body.fecha,
        hora: req.body.hora,
        consultorio: req.body.consultorio,
    };
    products.push(newProduct);
    saveProductsToDB(products);
    res.redirect('/');
});


rutas.get('/edit/:id', (req, res) => {
    const products = readProductsFromDB();
    const product = products.find((item) => item.id === parseInt(req.params.id));
    res.render('edit_product', { product });
});


rutas.post('/edit/:id', (req, res) => {
    const products = readProductsFromDB();
    const productIndex = products.findIndex((item) => item.id === parseInt(req.params.id));
    if (productIndex !== -1) {
        products[productIndex].nombre = req.body.nombre;
        products[productIndex].precio = parseFloat(req.body.precio);
        products[productIndex].fecha = req.body.fecha;
        products[productIndex].hora = req.body.hora;
        products[productIndex].consultorio = req.body.consultorio;
        saveProductsToDB(products);
    }
    res.redirect('/');
});


rutas.get('/delete/:id', (req, res) => {
    const products = readProductsFromDB();
    const updatedProducts = products.filter((item) => item.id !== parseInt(req.params.id));
    saveProductsToDB(updatedProducts);
    res.redirect('/');
});


rutas.get("/add_product",(req,res)=>{
    res.render("add_product");
});


rutas.get("/pacientes",(req,res)=>{
    res.render("pacientes");
});

rutas.get("/bienvenido",(req,res)=>{
    res.render("bienvenido");
});

rutas.get("/edit_product",(req,res)=>{
    res.render("edit_product");
});

function saveUsersToDB(users) {
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 4), 'utf8');
}


rutas.get('/listmed', (req, res) => {
    const users = readUsersFromDB();
    res.render('listmed', { users });
});


rutas.get('/add', (req, res) => {
    res.render('add_user');
});


rutas.post('/add', (req, res) => {
    const users = readUsersFromDB();
    const newUser = {
        id: Date.now(),
        nombre: req.body.nombre,
        precio: parseFloat(req.body.precio),
        fecha: req.body.fecha,
        hora: req.body.hora,
        consultorio: req.body.consultorio,
    };
    users.push(newUser);
    saveUsersToDB(users);
    res.redirect('/listmed');
});


rutas.get('/edit/:id', (req, res) => {
    const users = readUsersFromDB();
    const user = users.find((item) => item.id === parseInt(req.params.id));
    res.render('edit_user', { user });
});


rutas.post('/edit/:id', (req, res) => {
    const users = readUsersFromDB();
    const userIndex = users.findIndex((item) => item.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users[userIndex].nombre = req.body.nombre;
        users[userIndex].precio = parseFloat(req.body.precio);
        users[userIndex].fecha = req.body.fecha;
        users[userIndex].hora = req.body.hora;
        users[userIndex].consultorio = req.body.consultorio;
        saveUsersToDB(users);
    }
    res.redirect('/listmed');
});


rutas.get('/delete/:id', (req, res) => {
    const users = readUsersFromDB();
    const updatedUsers = users.filter((item) => item.id !== parseInt(req.params.id));
    saveUsersToDB(updatedUsers);
    res.redirect('/listmed');
});


module.exports=rutas;