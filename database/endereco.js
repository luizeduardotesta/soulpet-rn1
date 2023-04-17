// modelo para gerar a tabela de endereço no MySQL
// mapeamento: cada propriedade vira uma coluna da tabela

// Datatypes serve para definir o tipo da coluna
const {DataTypes} = require("sequelize");
const {connection} = require("./database")

const Endereco = connection.define("endereco", {
    // configurar as colunas 
    uf: {
        // nome VARCHAR NOT NULL
        type: DataTypes.STRING(2),
        allowNull: false
    },
    cidade: {
        // email VARCHAR NOT NULL UNIQUE
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        // telefone VARCHAR NOT NULL
        type: DataTypes.STRING,
        allowNull: false
    },
    rua: {
        // telefone VARCHAR NOT NULL
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        // telefone VARCHAR NOT NULL
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Endereco;