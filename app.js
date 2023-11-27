const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const getError = require("./config/error");
const getAccess = require("./config/security");
const dotenv = require("dotenv").config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

connectDB();
const app = express();
app.use(bodyParser.json());
getAccess(app);
app.use(authRoutes);
app.use(userRoutes);
getError(app);

app.listen(process.env.PORT, () => console.log("Le serveur a démarré au port  " + process.env.PORT));




