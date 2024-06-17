const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { connDB } = require('./database/database');
const employeeRoute = require('./routes/employee');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const errorHandler = require('./middlewares/errorHandler');

connDB();
app.use(cors());
app.use(express.json());
app.use('/', employeeRoute);
app.use('/', loginRoute);
app.use('/', profileRoute);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`));
