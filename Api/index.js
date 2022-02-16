const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const user = require('./components/user/network');
const auth = require('./components/auth/network');
const config = require('../config.js');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());


app.use('/api/user', user);
app.use('/api/auth', auth);
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(errors);

app.listen(config.api.port, () =>{
    console.log(`API is running on port ${config.api.port}`);
});  