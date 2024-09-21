require("dotenv").config();
const path = require("path");
const express = require("express");
const staticPath = path.join(__dirname, "../public");

const app = express();

app.use(express.static(staticPath));

app.listen(process.env.PORT, () => console.log(`server started at ${process.env.PORT}`));
