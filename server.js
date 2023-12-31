const express = require('express');
const itemRouter = require('./itemsRouter');

const app = express();

app.use(express.json());

app.use('/items', itemRouter);

app.listen(3000, () => {
    console.log('Server on port 3000');
});