const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"Ma144141Ma@",
    database:"test",
    charset: 'utf8mb4' 
})
db.connect((err) => {
    if (err) {
      throw err;
    }
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Add 1 day
    const formattedDate = currentDate.toISOString().slice(0, 10); // Format to 'YYYY-MM-DD'
    console.log(formattedDate);
    console.log('Connected to MySQL database');
  });
module.exports = db;