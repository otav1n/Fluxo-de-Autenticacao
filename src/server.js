const app = require("./app");
const { DB_PORT } = require("./config");

const PORT = DB_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
