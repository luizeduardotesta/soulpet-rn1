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
app.post("/clientes", async (req, res) => {
    // passos para adicionar:
    // 1 - coletar informações do req.body
    const {nome, email, telefone, endereco} = req.body;
    
    // 2 - chamar o model e a função create
    try {
        const novo = await Cliente.create(
            {nome, email, telefone, endereco}, 
            {include: [Endereco]} // permite inserir o endereço a um cliente
        );
        res.status(201).json(novo)
    }catch (err) {
        res.status(500).json({message: "Um erro aconteceu."})
    }
});




// Escuta de eventos (listener)
app.listen(3000, () =>{
    connection.sync({force: true}); // gerar tableas a partir do model
    console.log("Servidor rodando em http://localhost:3000");
});