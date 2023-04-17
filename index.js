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
app.get("/clientes", async (req, res) => {
    // encontrar os clientes com findAll
    const listaClientes = await Cliente.findAll();
    res.json(listaClientes)
});

app.get("/clientes/:id", async (req, res) => {
    // encontrar os clientes com findOne
    const cliente = await Cliente.findOne({
        where: {id: req.params.id}, 
        include: [Endereco]
    });

    if(cliente){
        res.json(cliente)
    } else {
        res.status(404).json({message: "Usuaário não encontrado"})
    }
});


app.post("/clientes", async (req, res) => {
    // coletar informações do req.body
    const {nome, email, telefone, endereco} = req.body;
    
    // chamar o model e a função create
    try {
        const novo = await Cliente.create(
            {nome, email, telefone, endereco}, 
            {include: [Endereco]} // permite inserir o endereço a um cliente
        );
        res.status(201).json(novo)
    }catch (err) {
        console.log(err);
        res.status(500).json({message: "Um erro aconteceu."})
    }
});




// Escuta de eventos (listener)
app.listen(3000, () =>{
    // gerar tableas a partir do model
    // connection.sync();

    // force : true = resetar dados da tabela
    connection.sync({force: true}); 
    console.log("Servidor rodando em http://localhost:3000");
});