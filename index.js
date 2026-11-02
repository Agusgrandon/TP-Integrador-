//importaciones
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express();
const PORT = environments.port;

app.use(cors());
// middlewares, es una funcion que esta en medio de la peticion y la respuesta
app.use((req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// endpoints (URL + HTTP + LOGICA)
app.get("/", (req, res) =>{
    res.send("agusususs")
});

//get, escucha peticiones web

app.get("/api/products", async (req, res) =>{
    const [rows] = await connection.query("SELECT * FROM products");
    //console.log(rows);
    res.status(200).json({
        payload: rows
    })
})

// GET product by id
app.get("/api/products/:id", async (req, res) => {

    // Gracias al objeto req, extraigo el valor numero de la url
    const id = req.params.id;

    const [rows] = await connection.query(`SELECT * FROM products WHERE products.id = ${id}`);

    // console.log(rows);
    res.status(200).json({
        payload: rows
    })
});

app.listen(PORT, () =>{
    console.log(`Servidor http://localhost:${PORT}`);
});