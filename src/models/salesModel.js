const connection = require('./connection');

const getAll = async () => {
const query = `SELECT sale_prod.product_id, sale_prod.sale_id, sale_prod.quantity, sales.date 
FROM StoreManager.sales_products AS sale_prod
JOIN StoreManager.sales AS sales ON sale_prod.sale_id = sales.id
ORDER BY sale_prod.sale_id, sale_prod.product_id`;
const [sales] = await connection.execute(query);
  return sales.map(({ date, product_id: productId, sale_id: saleId, quantity }) =>
    ({ saleId, date, productId, quantity }));
};
const getById = async (id) => {
const query = `SELECT * FROM StoreManager.sales 
  INNER JOIN StoreManager.sales_products AS sale_prod
  ON sale_prod.sale_id = sales.id WHERE sales.id = ?`;
  const [sales] = await connection.execute(query, [id]);
  if (sales.length === 0) {
    throw new Error('Sale not found');
  }
  return sales
    .map(({ date, product_id: productId, quantity }) => ({ date, productId, quantity }));
};

const createSale = async () => {
const query = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [new Date()]);

  return insertId;
};

const createSaleProduct = async (saleId, productId, quantity) => {
const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return insertId;
};

module.exports = {
createSale, 
createSaleProduct,
getAll,
getById,
};