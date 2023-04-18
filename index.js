// biblioteca de variaveis de ambiente
require("dotenv").config();
const express = require("express");



// Configuração do App
const app = express();
app.use(express.json()); // possibilita transsitar dados usando json




// Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database")
authenticate(connection); // efetivar a conexão
const Cliente = require("./database/cliente"); // configurar o model cliente
const Endereco = require("./database/endereco"); // configura o model endereço
const Pet = require("./database/pet"); // configurar o model pet



// Definição de rotas
// Filtrar todos os clientes
app.get("/clientes", async (req, res) => {
    // encontrar os clientes com findAll
    const listaClientes = await Cliente.findAll();
    res.json(listaClientes)
});

// Filtrar um unico cliente pelo id
app.get("/clientes/:id", async (req, res) => {
    // encontrar os clientes com findOne
    const cliente = await Cliente.findOne({
        where: { id: req.params.id },
        include: [Endereco]
    });

    if (cliente) {
        res.json(cliente)
    } else {
        res.status(404).json({ message: "Usuaário não encontrado" })
    }
});

// Criar um cliente
app.post("/clientes", async (req, res) => {
    // coletar informações do req.body
    const { nome, email, telefone, endereco } = req.body;

    // chamar o model e a função create
    try {
        const novo = await Cliente.create(
            { nome, email, telefone, endereco },
            { include: [Endereco] } // permite inserir o endereço a um cliente
        );
        res.status(201).json(novo)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

// Atualizar um cliente pelo id
app.put("/clientes/:id", async (req, res) => {
    // coletar as insformações do body da requisição e o params.id
    const { nome, email, telefone, endereco } = req.body
    const { id } = req.params

    try {
        // busca cliente pelo id
        const cliente = await Cliente.findOne({ where: { id } });

        // busca o cliente no banco de dados
        if (cliente) {
            //busca o endereço no banco de dados para atualizar
            if (endereco) {
                await Endereco.update(endereco, { where: { clienteId: id } });
            }
            // atualiza o cliente no banco de dados
            await cliente.update({ nome, email, telefone });
            res.status(200).json({ message: "Informações atualizadas com sucesso!" })
        } else {
            res.status(404).json({ message: "Cliente não encontrado." })
        }

    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }

});

// Deletar um cliente pelo id
app.delete("/clientes/:id", async (req, res) => {
    // Busca o cliente pelo id
    const { id } = req.params
    const cliente = await Cliente.findOne({ where: { id } })

    // Deleta o cliente encontrado do banco de dados
    try {
        if (cliente) {
            await cliente.destroy()
            res.status(200).json({ message: "Cliente deletado com sucesso!" })
        } else {
            res.status(404).json({ message: "Cliente não encontrado." })
        }

    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});


// Escuta de eventos (listener)
app.listen(3000, () => {
    // gerar tableas a partir do model
    // connection.sync();

    // force : true = resetar dados da tabela a cada atualização do codigo
    connection.sync({ force: true });
    console.log("Servidor rodando em http://localhost:3000");
});