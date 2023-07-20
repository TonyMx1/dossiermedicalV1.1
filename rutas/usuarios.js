var rutas=require("express").Router();
const fs = require('fs');

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

rutas.post("/acceder", (req, res)=>{
    if(req.body.usuario=="admin" && req.body.password=="admin"){
        req.session.usuario=req.body.usuario;
        res.redirect("/bienvenido");
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
  

module.exports=rutas;