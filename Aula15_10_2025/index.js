import fs from "fs";
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

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
app.get("/gerarUUID", (req, res) => {
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

app.post("/categorias", (req, res) => {
    const {nome} = req.body;

    if (!nome || nome == "") {
        return res.status(400).json({msg: "Parâmetro(s) incompleto(s)"});
    }

    let data = read();
    let categorias = data.categorias;

    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].nome == nome) return res.status(400).json({msg: "Categoria já cadastrada!"});
    }

    let novoId = uuidv4();

    categorias.push({id: novoId, nome: nome});

    data.categorias = categorias;

    console.log(data.categorias);

    save(data);

    return res.status(201).json({id: novoId, nome: nome});
});

app.get("/categorias", (req, res) => {
    let data = read();
    return res.status(200).json(data.categorias);
});

app.get("/categorias/:uuid", (req, res) => {
    let data = read();
    let categorias = data.categorias;
    let uuid = req.params.uuid;

    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].id == uuid) return res.status(200).json(categorias[i]);
    }

    return res.status(400).json({msg: "Não encontrada!"});
});

app.put("/categorias/:uuid", (req, res) => {
    let uuid = req.params.uuid;

    if (!uuidValidate(uuid)) {
        return res.status(400).send({msg: "ID inválido!"});
    }

    let data = read();
    let categorias = data.categorias;
    let index = -1;

    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].id == uuid) index = i;
    }

    if (index == -1) return res.status(400).send({msg: "Categoria não encontrada!"});

    const {nome} = req.body;

    if (!nome || nome == "") {
        return res.status(400).json({msg: "Parâmetro(s) incompleto(s)"});
    }

    categorias[index] = {id: categorias[index].id, nome: nome};
    data.categorias = categorias;

    save(data);

    return res.status(200).send({id: categorias[index].id, nome: nome});
});

app.delete("/categorias/:uuid", (req, res) => {
    let uuid = req.params.uuid;

    if (!uuidValidate(uuid)) {
        return res.status(400).send({msg: "ID inválido!"});
    }

    let data = read();
    let categorias = data.categorias;
    let index = -1;

    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].id == uuid) index = i;
    }

    if (index == -1) return res.status(400).send({msg: "Categoria não encontrada!"});

    let categoriaRemovida = categorias[index];
    categorias.splice(index, 1);

    data.categorias = categorias;

    save(data);

    return res.status(200).send(categoriaRemovida);
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})