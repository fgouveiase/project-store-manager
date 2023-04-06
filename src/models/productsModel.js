const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

const updateProduct = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const product = await connection.execute(query, [name, id]);
  return product;
};

const createProducts = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUE (?)';
  const [result] = await connection.execute(query, [name]);
  return { name, id: result.insertId };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  createProducts,
  updateProduct,
  deleteProduct,
};