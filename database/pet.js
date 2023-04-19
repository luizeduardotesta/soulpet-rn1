// modelo para gerar a tabela de pets no MySQL
// mapeamento: cada propriedade vira uma coluna da tabela

// Datatypes serve para definir o tipo da coluna
const {DataTypes} = require("sequelize");
const {connection} = require("./database")

const Pet = connection.define("pet", {
    // configurar as colunas 'nome', tipo, porte e data de nascimento
    nome: {
        // nome VARCHAR NOT NULL
        type: DataTypes.STRING(130),
        allowNull: false
    },
    tipo: {
        // tipo VARCHAR NOT NULL UNIQUE
        type: DataTypes.STRING(100),
        allowNull: false
    },
    porte: {
        // porte VARCHAR NOT NULL
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dataNasc: {
        // dataNasc VARCHAR NOT NULL
        type: DataTypes.DATEONLY
    }
});

// Associação 1:N (one-to-many)
const Cliente = require("./cliente")

// Cliente tem varios pets
// Pet ganha a chave estrangeira clienteId 
// Pet pertence ao cliente
Cliente.hasMany(Pet, {onDelete: "CASCADE"});
// Quando o cliente dor deletado todos os pets seram deletados tb
Pet.belongsTo(Cliente);


module.exports = Pet;