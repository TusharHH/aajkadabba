const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const connectDB = require('./connection.js');

const HomemakerRoutes = require('./routes/Homemaker.routes.js');
const CustomerRoutes = require('./routes/Customer.routes.js');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/homemakers', HomemakerRoutes);
app.use('/api/v1/customers', CustomerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

