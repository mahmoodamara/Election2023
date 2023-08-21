const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
router.use(bodyParser.json());
const  db  = require('../db');

router.post('/data', (req, res) => {
    const insertQuery = 'INSERT INTO historydata (candidates, datedata) VALUES (?, ?)';
    const values = [cityname, datedata, JSON.stringify(arrayofnames), JSON.stringify(arrayofvotes)];
  
    db.query(insertQuery, values, (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.json({ message: 'Data added successfully' });
    });
  });

  module.exports = router;