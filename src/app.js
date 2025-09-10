// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./Infrastructure/Express/routes/routes");
const errorHandler = require("./Infrastructure/Express/middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);

const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

module.exports = app;
