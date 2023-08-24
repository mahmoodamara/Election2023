const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
router.use(bodyParser.json());
const  db  = require('../db');
const cron = require('node-cron');

cron.schedule('7 0 * * *', () => {
  const insertQuery = 'INSERT INTO historydata (candidatesid, candidatesname, candidatesvotes, datedata, candidatecity) VALUES (?, ?, ?, ?, ?)';
  const q = "SELECT * FROM candidates";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return; // Don't continue if there's an error
    }
    
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate()); // No need to add 1 day here
    const formattedDate = currentDate.toISOString().slice(0, 10); // Format to 'YYYY-MM-DD'
    
    for (let i = 0; i < data.length; i++) {
      const values = [data[i].id, data[i].name, data[i].votes, formattedDate, data[i].city];
      
      const updateQuery = 'UPDATE candidates SET votes = 0 WHERE id = ?';
      db.query(updateQuery, [data[i].id], (err, result) => {
        if (err) {
          console.error(err);
        }
        // Don't return a response here
      });

      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
});




  module.exports = router;