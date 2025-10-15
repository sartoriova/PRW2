const fs = require("fs");;
const express = require("express");
const cors = require("cors");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");

const app = express();
// Adiciona parser de JSON, usado para receber JSON no corpo da requisição.
app.use(express.json());
// Adiciona suporte ao CORS, permitindo requisições de endereços diferentes do endereço local do servidor.
app.use(cors());
// Nome do arquivo local onde será armazenado os dados em formato JSON.
const FILEPATH = "data.json";

// Ler JSON
function read() {
    const data = fs.readFileSync(FILEPATH, "utf-8");
    return JSON.parse(data);
}

// Salvar JSON
function save(obj) {
    fs.writeFileSync(FILEPATH, JSON.stringify(obj, null, 2), "utf-8");
}

// Rota de exemplo para listar os dados completo do arquivo
app.get("/", (req, res) => {
    const dados = read();
    res.status(200).json(dados);
})

// Rota de exemplo que demonstra a forma de criar um novo id: 
app.get("/teste", (req, res) => {
    let novoId = uuidv4();
    res.status(200).json(novoId);
})

// Rota de exemplo que demonstra a forma de validar se um ID tem o formato válido:
app.get("/teste/:id", (req, res) => {
    if (!uuidValidate(req.params.id)) {
        return res.status(400).json({ msg: "ID inválido" });
    }
    res.status(200).json({ msg: "ID válido" });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})