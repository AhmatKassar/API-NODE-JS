const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config({path: './config/.env'});
require("./config/db");
const getError = require("./config/error");
const getAccess = require("./config/security");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


const app = express();

app.use(bodyParser.json())
    .use(getAccess)
    .use(authRoutes)
    .use(userRoutes)
    .use(getError);

app.listen(process.env.PORT, () => console.log("Le serveur a démarré au port  " + process.env.PORT));