const Pet = require("../database/pet");
const Cliente = require("../database/cliente");

const {Router} = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

// CRUD Pets
// Criar um pet
router.post("/pets", async (req, res) => {
    // coletar informações do req.body
    const { nome, tipo, porte, dataNasc, clienteId } = req.body;

    // chamar o model e a função create
    try {
        const cliente = await Cliente.findOne({where: {id: clienteId}})
        if (cliente) {
            const novoPet = await Pet.create({ nome, tipo, porte, dataNasc, clienteId });
            res.status(201).json(novoPet)
        } else {
            res.status(404).json({ message: "Cliente não encontrado."})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

// Filtrar todos os pets
router.get("/pets", async (req, res) => {
    // encontrar os pets com findAll
    const listaPets = await Pet.findAll();
    res.json(listaPets)
});

// Filtrar um unico pet pelo id
router.get("/pets/:id", async (req, res) => {
    // encontrar os pets com findOne
    const pet = await Pet.findOne({
        where: { id: req.params.id }
    });

    if (pet) {
        res.json(pet)
    } else {
        res.status(404).json({ message: "Pet não encontrado" })
    }
});

// Atualizar um pet pelo id
router.put("/pets/:id", async (req, res) => {
    // coletar as insformações do body da requisição e o params.id
    const { nome, tipo, porte, dataNasc } = req.body;
    const { id } = req.params

    try {
        // busca pet pelo id
        const pet = await Pet.findOne({ where: { id } });

        // busca o pet no banco de dados
        if (pet) {
            // atualiza o pet no banco de dados
            await pet.update({ nome, tipo, porte, dataNasc });
            res.status(200).json({ message: "Informações atualizadas com sucesso!" })
        } else {
            res.status(404).json({ message: "Pet não encontrado." })
        }

    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }

});

// Deletar um cliente pelo id
router.delete("/pets/:id", async (req, res) => {
    // Busca o pet pelo id
    const { id } = req.params
    const pet = await Pet.findOne({ where: { id } })

    // Deleta o pet encontrado do banco de dados
    try {
        if (pet) {
            await pet.destroy()
            res.status(200).json({ message: "Pet deletado com sucesso!" })
        } else {
            res.status(404).json({ message: "Pet não encontrado." })
        }

    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

module.exports = router;