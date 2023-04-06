const { notFound } = require('@hapi/boom');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsController }  = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productsMock } = require('./productsControllers.mock');

chai.use(sinonChai);
const { expect } = chai;

describe("Testes do products controller", function () {
  it("Testa se lista todos produtos", async function () {
     const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves(productsMock);

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('retorna o produto se o ID existe', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById').resolves(productsMock[0]);

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock[0]); 
  });

  afterEach(function () {
    sinon.restore();
  });
});