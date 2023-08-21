const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
router.use(bodyParser.json());
const  db  = require('../db');



router.get('/candidates/:city', (req, res) => {
    const city = req.params.city; // Get the add type from the URL parameter
    const q = "SELECT * FROM candidates WHERE city = ?";
    db.query(q, [city], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
  });


router.get('/candidates', (req, res) => {
    const q = "SELECT * FROM candidates";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


router.post('/candidates/addCandidates', (req, res) => {
    const q = "INSERT INTO candidates (`name`,`votes`,`city`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.votes,
        req.body.city
    ];
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("success");
    });
});

router.post('/candidates/addCandidates', (req, res) => {
    const q = "INSERT INTO candidates (`name`,`votes`,`city`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.votes,
        req.body.city
    ];
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("success");
    });
});



router.put('/candidates/:id', (req, res) => {
    const candidateId = req.params.id;
    const updateQuery = 'UPDATE candidates SET votes = votes + 1 WHERE id = ?';
    db.query(updateQuery, [candidateId], (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.json({ message: 'Votes incremented successfully' });
    });
  });

  router.delete('/candidates/:id', (req, res) => {
    const candidateId = req.params.id;
    const deleteQuery = 'DELETE FROM candidates WHERE id = ?';
  
    db.query(deleteQuery, [candidateId], (err, result) => {
      if (err) {
        return res.json(err);
      }
  
      if (result.affectedRows === 0) {
        return res.json({ message: 'Candidate not found' });
      }
  
      return res.json({ message: 'Candidate deleted successfully' });
    });
  });


module.exports = router;