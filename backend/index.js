import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

const db = mysql2.createConnection({ // conexao BD
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "car_jockey"
})    

app.use(cors())

app.get("/cars/search", (req,res)=>{ //getter para ter os dados todos de um certo modelo de carro
    const model = req.query.model;
    const q = "SELECT * FROM cars WHERE model like ?";
    db.query(q, [`${model}`], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/cars/search/unique", (req,res)=>{ //getter para ter todos os modelos de carros na BD
    const model = req.query.model;
    const q = "SELECT DISTINCT model FROM cars WHERE model like ?"; 
    db.query(q, [`%${model}%`], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.listen(8800, ()=>{ //apenas para saber se o servidor esta UP!
    console.log("welcome to backend")
})