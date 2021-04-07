const express = require("express");
const morgan = require("morgan");
const bodyParse = require("body-parser");
const app = express();

const rotasTasks = require("./routes/tasks");
const { request } = require("express");

app.use(morgan("dev"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Header",
    "Origin",
    "X-Requested-with",
    "Content-Type",
    "Accept",
    "Authorization"
  );

  if (req.method === "OPTIONS") {
    req.header("Acess-Control-Allow-Methods", "GET");

    return res.status(200).send({});
  }

  next();
});

app.use("/tasks", rotasTasks);

app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
