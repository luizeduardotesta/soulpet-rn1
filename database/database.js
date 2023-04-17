// database.js = arquivo de conexão com o banco de dados
// vai ler as variáveis de ambiente e tantear conectar ao banco

const { Sequelize } = require("sequelize");

// objeto de conexão
const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
);

// estabelece conexão usando o objeto
async function authenticate(connection) {
    try {
        // tentar estabelecer conexão com o banco
        await connection.authenticate();
        console.log("Conexão estabelecida com sucesso!");
    } catch (err) {
        // err = objeto que guarda detalhes sobre erro que aconteceu
        console.log("Um erro inesperado aconteceu", err);
    }
}

module.exports = {connection, authenticate};