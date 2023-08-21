const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const cors = require('cors');
router.use(bodyParser.json());
const  db  = require('../db');
const ip = require('ip'); // Import the 'ip' library



router.get('/votes', (req, res) => {
    const userAgent = req.headers['user-agent'];
    console.log(clientIP)
    res.json({
      userAgent: userAgent,
      clientIP: clientIP,
    });
  });


  router.post('/votes/:id', (req, res) => {
    const candidate_id = req.params.id; // Get the add type from the URL parameter
    // Get user-agent (browser and device information)
    const userAgent = req.headers['user-agent'];
    const clientIP = ip.address(); // Get the IPv4 address
    console.log(clientIP)
    const insertQuery = 'INSERT INTO votes (candidate_id,userAgent, clientip,isvote) VALUES (?,?, ?,?)';
    db.query(insertQuery, [candidate_id,userAgent, clientIP,true], (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.json({ message: 'Device information added successfully' });
    });
  });


module.exports = router;