const express = require('express');
const router = express();

const pool = require('../utils/db');

router.get('/', async (req, res) => {
  console.log('/api/1.0/stock 收到請求');
  let [data] = await pool.execute('SELECT * FROM stocks');
  res.json(data);
});

router.get('/:stockno', async (req, res) => {
  console.log('/api/1.0/stock/:stockno 收到請求');
  let dataShowType = req.query.type || 'page';
  if (dataShowType === 'date') {
    let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date', [req.params.stockno]);
    res.json(data);
    return;
  }
  let [total] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [req.params.stockno]);
  let currentPage = Number(req.query.page) || 1;
  const perPage = 5;
  total = total[0].total;
  const offset = perPage * (currentPage - 1);
  const lastPage = Math.ceil(total / perPage);
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ?  OFFSET ?', [req.params.stockno, perPage, offset]);

  res.json({ pagination: { total, perPage, currentPage, lastPage }, data });
});

module.exports = router;
