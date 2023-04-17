// biblioteca de variaveis de ambiente
require("dotenv").config();
const express = require("express");



// Configuração do App
const app = express();
app.use(express.json()); // possibilita transsitar dados usando json




// Configuração do Banco de Dados
const {connection, authenticate} = require("./database/database")
authenticate(connection); // efetivar a conexão
const Cliente = require("./database/cliente"); // configurar o model cliente
const Endereco = require("./database/endereco"); // configura o model endereço




// Definição de rotas
app.post("/clientes", (req, res) => {
    const {nome, email, telefone} = req.body;
    console.log(nome, email, telefone)
    res.json("recebido!");
});




// Escuta de eventos (listener)
app.listen(3000, () =>{
    connection.sync({force: true}); // gerar tableas a partir do model
    console.log("Servidor rodando em http://localhost:3000");
});