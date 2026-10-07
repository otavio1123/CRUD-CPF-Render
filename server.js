const jsonServer = require("json-server");
const express = require("express");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(express.static("public"));

server.use(jsonServer.bodyParser);

server.use(router);

const porta = process.env.PORT || 3000;

server.listen(porta, () => {
    console.log("Servidor rodando na porta " + porta);
});