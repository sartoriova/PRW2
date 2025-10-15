# 📚 Exercicio Prático Express — PRW2 2025/2

Sistema RESTful simples para gerenciamento de **Categorias** e **Notícias**, usando **Node.js**, **Express** e um arquivo JSON local (`data.json`) como banco de dados.

---

## 🚀 Objetivo

Criar um sistema com operações CRUD (Criar, Ler, Atualizar, Deletar) para:

* **Categorias**
* **Notícias**

O foco é entender rotas REST, operaçoes CRUD, express e tratamento básico de erros.

---

## ▶️ Como rodar

1. Clonar / copiar o projeto
2. `npm install`
3. `npm run dev` (ou `npm start`)

Servidor rodando em `http://localhost:3000` por padrão

---

## 🔌 Endpoints (API)

### Categorias

* `GET /categorias` — listar todas as categorias
* `GET /categorias/:id` — obter categoria por id
* `POST /categorias` — criar categoria

  * body: `{ "nome": "Nome da categoria" }`
* `PUT /categorias/:id` — atualizar categoria

  * body: `{ "nome": "Nome atualizado" }`
* `DELETE /categorias/:id` — remover categoria. Remove todas as notícias da categoria removida.

**Exemplo (POST)**

```
POST /categorias
Content-Type: application/json

{ "nome": "Saúde" }
```

Resposta (201 Created):

```json
{ "id": "12d673cd-9922-4f50-8bb6-acb901132a9c", "nome": "Saúde" }
```

### Notícias

* `GET /noticias` — listar todas as notícias
* `GET /noticias/:id` — obter notícia por id
* `GET /noticias/categoria/:id` — obter todas as notícias de determinada categoria
* `POST /noticias` — criar notícia

  * body: `{ "titulo": "...", "texto": "...", "categoria" : ... }`
* `PUT /noticias/:id` — atualizar notícia

  * body: `{ "titulo": "...", "texto": "...", "categoria": ... }`
* `DELETE /noticias/:id` — remover notícia

**Exemplo (POST)**

```
POST /noticias
Content-Type: application/json

{
  "categoria": "12d673cd-9922-4f50-8bb6-acb901132a9c"
  "titulo": "Nova biblioteca digital",
  "texto": "Descrição da notícia..."
}
```

Resposta (201 Created):

```json
{
  "id": "e0fdddc3-5a8a-4a75-83fb-a543fe1ed446",
  "categoria": "12d673cd-9922-4f50-8bb6-acb901132a9c",
  "titulo": "Nova biblioteca digital",
  "texto": "Descrição da notícia..."
}
```

---

## ✅ Boas práticas e validações

* Validar campos obrigatórios em `POST` e `PUT`.
* Não permitir o cadastro ou edição de uma notícia em uma categoria inexistente.
* Não permitir o cadastro de uma categoria com nome duplicado.
* Retornar códigos HTTP apropriados.
* Evite de modificar o arquivo `data.json` manualmente.
