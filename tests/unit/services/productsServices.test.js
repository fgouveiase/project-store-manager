const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { productsMock, notFound } = require('./productsService.mock');
const { productsModel } = require('../../../src/models/');
const { productsService }  = require('../../../src/services');

const { expect } = chai;
chai.use(sinonChai);

describe('Verificando service produtos', function () {
    it('lista todos os produtos', async function () {
      sinon.stub(productsModel, 'getAll').resolves(productsMock);
      const result = await productsService.getAll();

      expect(result).to.deep.equal(productsMock);
    });

  afterEach(function () {
    sinon.restore();
  });
});

  it('retorna erro se o ID e inválido', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    try {
      await productsService.getById('...')
    } catch (error) {
      expect(error.message).to.be.equal(notFound.message);
    }
  });

  it('retorna o produto pelo ID valido', async function () {
    sinon.stub(productsModel, 'getById').resolves(productsMock[0]);
    const result = await productsService.getById(1);

    expect(result).to.deep.equal(productsMock[0]);
  });

  afterEach(function () {
    sinon.restore();
  });

describe('Testa se cria, altera e deleta', function () {
  it("testa a função se cria corretamente", async function () {
    const newProduct = { id: 4, name: 'Machado do Thor Stormbreaker' };
    const changeProductName = { name: 'Machado do Thor Stormbreaker' };

    sinon.stub(productsModel, "createProducts").resolves(newProduct);
    const product = await productsService.createProducts(changeProductName);

    expect(product).to.equal(newProduct);
  });

  it("Testa se e alterado", async function () {
    const changed = { id: 1, name: 'Machado do Thor Stormbreaker' }
      const changeName = { name: 'Machado do Thor Stormbreaker' };

      const update = sinon.stub(productsModel, "updateProduct");
      sinon.stub(productsModel, "getById").resolves(changed);

      const data = await productsService.updateProduct(changeName, 1);
      sinon.assert.calledOnce(update);
      expect(data).to.equal(changed);
    });

    });
  
  it("testa se deleta", async function () {
    const deleted = sinon.stub(productsModel, "deleteProduct");
    await productsService.deleteProduct(1);

    sinon.assert.calledOnce(deleted);
  })

  it("testa altera", async function () {
      const product = { id: 1, name: 'Machado do Thor Stormbreaker' }
      const changeName = { name: 'Machado do Thor Stormbreaker' };

      const data = sinon.stub(productsModel, "updateProduct");
      sinon.stub(productsModel, "getById").resolves(product);

      const update = await productsService.updateProduct(changeName, 1);
      sinon.assert.calledOnce(data);
      expect(update).to.equal(product);
  });

  afterEach(function () {
   sinon.restore();
  }); 

