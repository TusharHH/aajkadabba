const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const connection = require('./connection.js');

const { HomemakerRoutes } = require('./routes/Homemaker.routes.js');

connection();

app.use(express.json());

app.use('/api/v1/homemakers', HomemakerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

