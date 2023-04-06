const { notFound } = require('@hapi/boom');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsController }  = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productsMock } = require('./productsControllers.mock');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

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

  it('recebe um produto a partir do seu id', async function () {
      sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
      const result = await productsModel.getById(1);

      expect(result).to.be.deep.equal(productsMock[0]);
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

  it("Testa se o produto pode ser atualizado", async function () {
      const id = 1;
      const changed = "changed";
      const data = await sinon.stub(connection, 'execute');
      await productsModel.updateProduct(changed, id);
      sinon.assert.calledOnce(data);
    });

  it('Testa se deleta o produto', async function () {
      const res = {};
      const req = { params: { id: 1 }};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(productsService, "deleteProduct");

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

  afterEach(function () {
    sinon.restore();
  });
});