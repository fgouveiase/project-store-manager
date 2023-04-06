const express = require('express');
const { productsController } = require('./controllers');
const errorHandle = require('./middlewares/errorHandle');
const validationProduct = require('./middlewares/validationProduct');

const app = express();

app.use(express.json());
app.use(errorHandle);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', validationProduct, productsController.createProducts);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;