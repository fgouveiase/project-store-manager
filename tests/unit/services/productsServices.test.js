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
