
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors'); // Import the cors package
app.use(cors());


const candidates = require('./controllers/Candidates');
const adds = require('./controllers/adds');
const votes = require('./controllers/vote');
const citys = require('./controllers/citys');
const history = require('./controllers/historydata');

app.use('/api', candidates);
app.use('/api', adds);
app.use('/api', votes);
app.use('/api', citys);
app.use('/api', history);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const cron = require('node-cron');

cron.schedule('8 14 * * *', () => {
  console.log('Task executed at 6:00 AM.');
});