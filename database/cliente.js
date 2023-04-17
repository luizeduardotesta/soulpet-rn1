// modelo para gerar a tabela de clientes no MySQL
// mapeamento: cada propriedade vira uma coluna da tabela

// Datatypes serve para definir o tipo da coluna
const {DataTypes} = require("sequelize");
const {connection} = require("./database")

const Cliente = connection.define("cliente", {
    // configurar as colunas 'nome', email e telefone
    nome: {
        // nome VARCHAR NOT NULL
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        // email VARCHAR NOT NULL UNIQUE
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        // telefone VARCHAR NOT NULL
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Cliente;