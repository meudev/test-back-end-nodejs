# 🚀 TESTE DE CONHECIMENTO - SoftDesign
Este projeto tem como finalidade teste de conhecimento para vaga back-end nodejs.


## Tecnologias

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" /> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />

## Configurando ambiente
#### 1. Clonar projeto

      git clone https://github.com/meudev/test-back-end-nodejs.git

#### 2. Instalar dependências do projeto.

      npm install 
    
#### 3. Criar ambiente docker.

      docker-compose up
      
#### 4. Criar Banco de Dados.

      npm typeorm migration:run   
      
#### 5. Rodar testes

      npm test 

## Requisições

#### USERS
##### Cadastrar novo usuário
      http://localhost:3333/users/

      {
      	"name": "Usuário Teste",
      	"email": "teste@teste.com.br",
      	"password": "123456"
      }
##### Login
      http://localhost:3333/sessions/

      {
      	"email": "teste@teste.com.br",
      	"password": "123456"
      }
#### BOOKS
##### Cadastrar novo livro *
      http://localhost:3333/books/

      {
      	"title": "Livro Teste",
      	"description": "O livro que foi sucesso no teste.",
      	"category": "Testes"
      }
##### Listar todos livros cadastrados *
      http://localhost:3333/books/
##### Detalhes do livro *
      http://localhost:3333/books/details/

      {
      	"id": "<id do livro cadastrado>",
      }
##### Editar informações do livro *
      http://localhost:3333/books/edit/

      {
      	"id": "<id do livro cadastrado>",
        "title": "Livro Teste",
      	"description": "O livro que foi sucesso no teste.",
      	"category": "Testes"
      }
##### Remover livro *
      http://localhost:3333/books/delete/

      {
      	"id": "<id do livro cadastrado>",
      }
#### RENTS
##### Alugar livro *
      http://localhost:3333/rents/

      {
      	"id_user": "<id do usuário cadastrado>",
      	"id_book": "<id do livro cadastrado>",
      }
##### Devolver livro *
      http://localhost:3333/rents/devolution/

      {
      	"id_book": "<id do livro cadastrado>",
      }




 * Todas requisições com `*` deve contar o token Bearer
 
