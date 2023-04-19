// Importação de biblioteca e variaveis de ambiente
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");



// Configuração do App
const app = express();
app.use(express.json()); // possibilita transsitar dados usando json
app.use(morgan("dev")); 



// Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database")
authenticate(connection); // efetivar a conexão




// Definição de rotas
const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");

app.use(rotasClientes);
app.use(rotasPets);




// Escuta de eventos (listener)
app.listen(3000, () => {
    // gerar tableas a partir do model
    connection.sync();

    // force : true = resetar dados da tabela a cada atualização do codigo
    // connection.sync({ force: true });
    console.log("Servidor rodando em http://localhost:3000");
});