const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models/');
const { productsMock } = require('./productsModels.mock');


describe("Testes do products model", function () {
  it("Teste se lista todos produtos", async function () {
    sinon.stub(connection, "execute").resolves([productsMock]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(productsMock);

    it("Teste se recupera produto pelo id", async function () {
      sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
      const result = await productsModel.getById(1);

      expect(result).to.be.deep.equal(productsMock[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});